"use client";

import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie to get the token
import { io } from "socket.io-client"; // Import socket.io-client

import ChatMessage from "./ChatMessage.tsx";
import CommentBox from "./CommentBox.tsx";

const Chatbox = ({ setChatState }: { setChatState: () => void }) => {
  const [messages, setMessages] = useState<any[]>([]); // Type updated to any[] for dynamic messages
  const token = Cookies.get("token"); // Get token from cookies
  
  // Initialize socket connection with token in the header
  const socket = io("ws://192.168.16.1:5001", {
    transports: ["websocket"], // Only WebSocket transport
    extraHeaders: {
      Authorization: `Bearer ${token}`, 
    },
  });

  useEffect(() => {
    // On successful connection
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      if (data.type === "newChatMessage") {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderType: data.senderType,
            createdAt: new Date(data.createdAt).toLocaleTimeString(),
            message: data.message,
          },
        ]);
      }
    });

    // Fetch recent chats (if needed on initial load)
    socket.emit("get_recent_messages");

    // Cleanup when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Send message to the server
  const sendMessage = (message: string) => {
    console.log("message",message);
    
    const receiverId = "67972f77a95d6bbfad654360"; 
    socket.emit("send_message", { receiverId, message });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "white",
        color: "black",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid grey",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Box sx={{ display: { xs: "flex", sm: "none" }, marginRight: "10px" }}>
          <IconButton sx={{ color: "black" }} onClick={setChatState}>
            <ArrowBackIcon />
          </IconButton>
        </Box>

        <Typography
          sx={{
            flex: 1,
            fontFamily: "Poppins",
            fontSize: { xs: "12px", sm: "20px", lg: "25px" },
            fontWeight: "bold",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Chat with Support
        </Typography>
      </Box>

      {/* Messages Section */}
      <Box
        sx={{
          flex: 1,
          padding: "20px 10px",
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            senderType={msg.senderType}
            time={msg.createdAt}
            message={msg.message}
          />
        ))}
      </Box>

      {/* Comment Box Section */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          padding: "10px 5px",
          backgroundColor: "white",
        }}
      >
        <CommentBox sendMessage={sendMessage} />
      </Box>
    </Box>
  );
};

export default Chatbox;
