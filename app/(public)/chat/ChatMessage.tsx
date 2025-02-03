import React, { useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";

interface ChatMessageProps {
  avatar: string;
  message: string;
  time: string;
  senderType: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ avatar, message, time, senderType }) => {
  const [hover, setHover] = useState(false);
  const isUser = senderType === "user";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 2,
        backgroundColor: "white",
        flexDirection: isUser ? "row-reverse" : "row",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <Avatar 
        src={avatar} 
        alt={senderType} 
        sx={{ width: 25, height: 25 }} 
      />
      <Box sx={{ flex: 1, textAlign: isUser ? "right" : "left" }}>
        <Typography
          sx={{
            fontSize: { xs: 10, sm: 12 },
            fontWeight: "bold",
            color: "black",
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: isUser ? "flex-end" : "flex-start",
          }}
        >
          <Typography sx={{ fontSize: { xs: 10, sm: 12 }, color: "black" }}>
            {time || "Unknown Time"} 
          </Typography>
          {senderType || "Unknown User"} 
         
        </Typography>

        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: "10px",
            justifyContent: "space-between",
            bgcolor: "#E4E4E41A",
            p: 1.5,
            borderRadius: 2,
            position: "relative",
            transition: "background 0.3s",
            maxWidth: { xs: "100%", sm: "75%" },
            textAlign: "left",
            ml: isUser ? "auto" : 0,
            mr: isUser ? 0 : "auto",
            "&:hover": {
              bgcolor: "#3F8CFF",
            },
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Typography
            sx={{
              fontSize: { xs: 12, sm: 14 },
              marginTop: "2px",
              color: "black",
              "&:hover": {
                color: "white",
              },
              transition: "color 0.3s",
              wordBreak: "break-word",
            }}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage;
