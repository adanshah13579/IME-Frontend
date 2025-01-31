"use client";

import React, { useState } from "react";
import { Box, IconButton, Divider, TextField, Button, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import MicIcon from "@mui/icons-material/Mic";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface CommentBoxProps {
  sendMessage: (message: string) => void; // Function passed as prop to send messages
}

const CommentBox: React.FC<CommentBoxProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  // Handle message change
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // Handle Send button click
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message); // Call the sendMessage function passed as prop
      setMessage(""); // Clear the input field after sending
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
        p: 2,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        maxWidth: { lg: "80%" },
        border: "1px solid #ccc",
      }}
    >
      {/* Icons Row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left Side Icons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton sx={{ color: "black" }}>
            <AttachFileIcon />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <SentimentSatisfiedAltIcon />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <MicIcon />
          </IconButton>
        </Box>

        {/* Right Side Text and Add Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ color: "black" }}>
            Create Offer
          </Typography>
          <IconButton sx={{ color: "black" }}>
            <AddCircleIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Input Field & Send Button */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          value={message}
          onChange={handleMessageChange}
          InputProps={{
            sx: {
              height: 40,
              color: "black",
              backgroundColor: "#f5f5f5",
              borderRadius: "12px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
            },
          }}
          inputProps={{
            style: { fontSize: "12px" },
          }}
        />

        {/* Send Button */}
        <Button
          variant="contained"
          onClick={handleSendMessage} // Call sendMessage when clicked
          disabled={!message.trim()} // Disable when empty
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "12px",
            height: 40,
            minWidth: 100,
            fontSize: "12px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Send
        </Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ mt: 2, backgroundColor: "#ccc" }} />
    </Box>
  );
};

export default CommentBox;
