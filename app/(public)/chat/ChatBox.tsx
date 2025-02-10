import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatMessage from "./Chatmessage";
import Commentbox from "./Commentbox";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns";
import OfferCard from "./offerdetails";

// Define interfaces for better type safety
interface SelectedUser {
  id: string;
  name?: string;
}

interface ChatboxProps {
  setChatState: () => void;
  selectedUser: SelectedUser | null;
  name: { name?: string };
}

interface Message {
  senderType: "user" | "doctor";
  createdAt: string;
  message: string | object;
  offerDetails?: object | null;
  offerId?: string | null;
}

interface ReceivedMessage {
  type: "recentChats" | "newChatMessage";
  senderType: "user" | "doctor";
  message: string;
  senderId?: string;
  createdAt?: string;
  recentMessages?: {
    recentMessages: Message[];
    user: object;
    doctor: object[];
  };
}

const Chatbox: React.FC<ChatboxProps> = ({ setChatState, selectedUser, name }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userData, setUserData] = useState<object | null>(null);
  const [doctorData, setDoctorData] = useState<object | null>(null);

  const token = Cookies.get("token");

  useEffect(() => {
    if (!selectedUser?.id) return;

    const newSocket: Socket = io(`ws://localhost:3001?token=${token}`, {
      transports: ["websocket"],
      forceNew: true,
      reconnectionAttempts: 5,
      timeout: 10000,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
      newSocket.emit("get_recent_messages", { userId: selectedUser.id });
    });

    newSocket.on("receive_message", (data: ReceivedMessage) => {
      console.log("Received message:", data);

      if (data.type === "recentChats" && data.recentMessages) {
        const filteredMessages = data.recentMessages.recentMessages.filter(
          (msg) => msg.senderType === "user" || msg.senderType === "doctor"
        );

        setUserData(data.recentMessages.user);
        setDoctorData(data.recentMessages.doctor[0]);

        const formattedMessages = filteredMessages.map((msg) => {
          let parsedOffer: object | null = null;

          if (typeof msg.message === "string") {
            try {
              parsedOffer = JSON.parse(msg.message);
            } catch (err) {
              console.error("Error parsing offer message:", err);
            }
          }

          return {
            senderType: msg.senderType,
            createdAt: msg.createdAt
              ? formatDistanceToNow(new Date(msg.createdAt))
              : "Just now",
            message: parsedOffer ? parsedOffer : msg.message,
            offerDetails: parsedOffer || null,
            offerId: msg.offerId || null,
          };
        });

        setMessages(formattedMessages);
      } 
      
      // Handle new real-time messages
      else if (data.type === "newChatMessage") {
        const newMessage: Message = {
          senderType: data.senderType,
          createdAt: formatDistanceToNow(new Date(), { addSuffix: true }),
          message: data.message,
          offerDetails: null,
          offerId: null,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    newSocket.on("offer_sent", (data: { offerDetails: object; offerId: string }) => {
      console.log("Offer sent confirmation received:", data);

      const newOfferMessage: Message = {
        senderType: "user",
        createdAt: formatDistanceToNow(new Date(), { addSuffix: true }),
        message: data.offerDetails,
        offerDetails: data.offerDetails,
        offerId: data.offerId,
      };

      setMessages((prevMessages) => [...prevMessages, newOfferMessage]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token, selectedUser]);

  const sendMessage = (message: string | { message: string }) => {
    if (!socket) {
      console.error("Socket not initialized");
      return;
    }

    const receiverId = selectedUser?.id;
    const messageContent = typeof message === "string" ? message : message.message;
    socket.emit("send_message", { receiverId, message: messageContent });
  };

  const sendOffer = (offerData: object) => {
    if (!socket) {
      console.error("Socket not initialized");
      return;
    }

    if (!selectedUser?.id) {
      console.error("No user selected to send the offer to");
      return;
    }

    const offerDetails = {
      receiverId: selectedUser?.id,
      offerData,
    };

    console.log("Sending offer:", offerDetails);
    socket.emit("send_offer", offerDetails);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid grey",
        }}
      >
        <Box sx={{ display: { xs: "flex", sm: "none" }, marginRight: "10px" }}>
          <IconButton sx={{ color: "black" }} onClick={setChatState}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography sx={{ flex: 1, fontSize: "20px", fontWeight: "bold" }}>
          {name?.name || "User"}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, padding: "20px 10px", overflowY: "auto" }}>
        {messages.length === 0 ? (
          <Typography>No messages yet...</Typography>
        ) : (
          messages.map((msg, index) => (
            <div key={index}>
              {msg.offerDetails ? (
                <OfferCard
                  offerDetails={msg.offerDetails}
                  offerId={msg.offerId || ""}
                  senderType={msg.senderType}
                  time={msg.createdAt}
                  selectedUserId={selectedUser?.id || ""}
                  headDetails={msg.senderType === "user" ? userData : doctorData}
                />
              ) : (
                <ChatMessage
                  senderType={msg.senderType}
                  time={msg.createdAt}
                  message={msg.message as string}
                  headDetails={msg.senderType === "user" ? userData : doctorData}
                />
              )}
            </div>
          ))
        )}
      </Box>

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          padding: "10px 5px",
          backgroundColor: "white",
        }}
      >
        <Commentbox sendMessage={sendMessage} sendOffer={sendOffer} />
      </Box>
    </Box>
  );
};

export default Chatbox;
