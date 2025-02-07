'use client'
import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns";
import ChatMessage from "./ChatMessage";
import CommentBox from "./CommentBox";
import OfferCard from "./offerdetails";


interface User {
  id: string;
  name?: string;
}

interface Message {
  senderType: string;
  createdAt: string;
  message: string | object;
  offerDetails: object | null;
  offerId?: string;
}

interface ChatboxProps {
  setChatState: () => void;
  selectedUser: User;
  name: User;
}

const Chatbox: React.FC<ChatboxProps> = ({ setChatState, selectedUser, name }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userData, setUserData] = useState(null);

  const [doctorData, setDockerData] = useState(null);

  

  const token = Cookies.get("token");
  useEffect(() => {
    if (!selectedUser?.id) return;
  
    const newSocket = io("ws://localhost:3001?token=" + token, {
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
  
    newSocket.on("receive_message", (data: any) => {
  
      if (data.type === "recentChats") {
        const filteredMessages = data.recentMessages.recentMessages.filter(
          (msg: any) => msg.sender === selectedUser.id || msg.receiver === selectedUser.id
        );
  
        setUserData(data.recentMessages.user)
        
        setDockerData(data.recentMessages.doctor[0])

        const formattedMessages = filteredMessages.map((msg: any) => ({
          senderType: msg.senderType,
          createdAt: msg.createdAt
          ? formatDistanceToNow(new Date(msg.createdAt))
          : "Just now",
          message: msg.message,
          offerDetails: msg.typeOfMessage === "offer" ? JSON.parse(msg.message) : null,
          offerId: msg.offerId || null, 

        }));
  
        setMessages(formattedMessages);
      }
    });
  
    newSocket.on("newChatMessage", (data: any) => {
  
      const newMessage = {
        senderType: data.senderType,
        createdAt: formatDistanceToNow(new Date() ),
        message: data.message,
        offerDetails: null,
        offerId: data.offerId || null,
      };
  
      setMessages((prevMessages) => [...prevMessages, newMessage]);
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
      receiverId: selectedUser.id,
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
          <IconButton sx={{ color: "black" }} onClick={() => setChatState()}>
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
                  offerId={msg.offerId} 
                  senderType={msg.senderType}
                  time={msg.createdAt}
                  selectedUserId={selectedUser.id}
                  headDetails={msg.senderType=="user" ?  userData : doctorData }

                />
              ) : (
                <ChatMessage
                  senderType={msg.senderType}
                  time={msg.createdAt}
                  message={msg.message}
                  headDetails={msg.senderType=="user" ?  userData : doctorData }

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
            <CommentBox sendMessage={sendMessage} sendOffer={sendOffer} />
      </Box>
    </Box>
  );
};

export default Chatbox;
