import React, { useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";

interface ChatMessageProps {
  message: string;
  time: string;
  senderType: "user" | "doctor"; // senderType can be "user" or "doctor"
  headDetails: {
    name: string;
    image: string;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, time, senderType, headDetails }) => {
  const [hover, setHover] = useState(false);

  // Determine alignment based on senderType
  const isUser = senderType === "user";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 2,
        flexDirection: isUser ? "row-reverse" : "row", // Align to right for user, left for doctor
        justifyContent: "flex-start", // Keep messages aligned to the left by default
        width: "100%",
      }}
    >
      {/* Avatar */}
      <Avatar
        src={headDetails?.image}
        alt={headDetails?.name || "Unknown User"}
        sx={{ width: 30, height: 30 }}
      />

      {/* Message Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
          maxWidth: "60%",
        }}
      >
        {/* Name */}
        <Typography
          sx={{
            fontSize: { xs: 10, sm: 12 },
            fontWeight: "bold",
            color: "black",
          }}
        >
          {headDetails?.name || "Unknown User"}
        </Typography>

        {/* Message Bubble */}
        <Box
          sx={{
            backgroundColor: isUser ? "#DCF8C6" : "#E4E6EB", // Green for user, grey for doctor
            p: 1.5,
            borderRadius: "12px",
            boxShadow: 1,
            wordBreak: "break-word",
            width: "auto",
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Message Text */}
          <Typography
            sx={{
              fontSize: { xs: 12, sm: 14 },
              color: "black",
              textAlign: "left",
            }}
          >
            {message}
          </Typography>

          {/* Time (properly spaced below the message) */}
          <Typography
            sx={{
              fontSize: "10px",
              color: "grey",
              alignSelf: "flex-end",
              mt: 0.5, // Small margin to separate from message text
            }}
          >
            {time || "Unknown Time"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage;
