'use client'

import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatMessage from "./ChatMessage";
import Commentbox from "./CommentBox";
import { formatDistanceToNow } from "date-fns";
import OfferCard from "./offerdetails";

interface ChatboxProps {
  setChatState: () => void;
  selectedUser: { id: string } | null;
  name: { name?: string };
  socket: any;
}

interface Message {
  senderType: string;
  createdAt: string;
  message: string | any;
  offerDetails: any | null;
  offerId: string | null;
}

const Chatbox: React.FC<ChatboxProps> = ({ setChatState, selectedUser, name, socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [doctorData, setDoctorData] = useState<any>(null);

  useEffect(() => {
    if (!socket || !selectedUser?.id) return;

    console.log("Fetching recent messages for:", selectedUser.id);
    socket.emit("get_recent_messages", { userId: selectedUser.id });

    const handleReceiveMessage = (data: any) => {
      console.log("Received message data:", data);

      if (data.type === "recentChats") {
        const filteredMessages = data.recentMessages.recentMessages.filter(
          (msg: any) => msg.sender === selectedUser.id || msg.receiver === selectedUser.id
        );

        setUserData(data.recentMessages.user);
        setDoctorData(data.recentMessages.doctor[0]);

        const formattedMessages: Message[] = filteredMessages.map((msg: any) => {
          let parsedOffer = null;

          if (msg.typeOfMessage === "offer" && msg.message) {
            try {
              parsedOffer = JSON.parse(msg.message);
            } catch (err) {
              console.error("Error parsing offer message:", err);
            }
          }

          return {
            senderType: msg.senderType,
            createdAt: msg.createdAt
              ? formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })
              : "Just now",
            message: parsedOffer ? parsedOffer : msg.message,
            offerDetails: parsedOffer || null,
            offerId: msg.offerId || null,
          };
        });

        console.log("Updating messages state:", formattedMessages);
        setMessages(formattedMessages);
      } else if (data.type === "newChatMessage") {
        console.log("New message received:", data);

        const newMessage: Message = {
          senderType: data.senderType,
          createdAt: formatDistanceToNow(new Date(), { addSuffix: true }),
          message: data.message,
          offerDetails: null,
          offerId: null,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, selectedUser]);

  const sendMessage = (message: string | { message: string }) => {
    if (!socket) return;
    const receiverId = selectedUser?.id;
    const messageContent = typeof message === "string" ? message : message.message;
    socket.emit("send_message", { receiverId, message: messageContent });
  };

  const sendOffer = (offerData: any) => {
    if (!socket || !selectedUser?.id) return;
    socket.emit("send_offer", { receiverId: selectedUser.id, offerData });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "white" }}>
      <Box sx={{ display: "flex", alignItems: "center", padding: "16px", borderBottom: "1px solid grey" }}>
        <Box sx={{ display: { xs: "flex", sm: "none" }, marginRight: "10px" }}>
          <IconButton sx={{ color: "black" }} onClick={setChatState}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography sx={{ flex: 1, fontSize: "20px", fontWeight: "bold" }}>{name?.name || "User"}</Typography>
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
                  offerId={msg.offerId}
                  senderType={msg.senderType}
                  time={msg.createdAt}
                  selectedUserId={selectedUser?.id || ""}
                  headDetails={msg.senderType === "user" ? userData : doctorData}
                />
              ) : (
                <ChatMessage
                  senderType={msg.senderType}
                  time={msg.createdAt}
                  message={msg.message}
                  headDetails={msg.senderType === "user" ? userData : doctorData}
                />
              )}
            </div>
          ))
        )}
      </Box>

      <Box sx={{ position: "sticky", bottom: 0, padding: "10px 5px", backgroundColor: "white" }}>
        <Commentbox sendMessage={sendMessage} sendOffer={sendOffer} />
      </Box>
    </Box>
  );
};

export default Chatbox;
