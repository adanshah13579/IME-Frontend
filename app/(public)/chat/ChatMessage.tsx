"use client";

import React, { useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";

interface ChatMessageProps {
  avatar: string;
  name: string;
  time: string;
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ avatar, name, time, message }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Avatar src={avatar} sx={{ width: 32, height: 32 }} />

      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 14 },
            fontWeight: "bold",
            color: "black",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {name}
          <Typography sx={{ fontSize: { xs: 10, sm: 12 }, color: "gray" }}>{time}</Typography>
        </Typography>

        {/* Message Box */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: 1,
            justifyContent: "space-between",
            bgcolor: hover ? "#3F8CFF" : "#E4E4E41A",
            p: 1.5,
            borderRadius: 2,
            maxWidth: { xs: "100%", sm: "75%" },
            transition: "background 0.3s",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Message Text */}
          <Typography
            sx={{
              fontSize: { xs: 12, sm: 14 },
              color: hover ? "white" : "black",
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
