"use client";
import React, { useState } from "react";
import { Box, IconButton, Divider, TextField, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import OfferModal from "./offerModal";

interface CommentBoxProps {
  sendMessage: (message: { type: string; message: string }) => void;
  sendOffer: (offer: { type: string; name: string; profession: string; price: string; schedule: string; estimatedHours: string; description: string }) => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({ sendMessage, sendOffer }) => {
  const [message, setMessage] = useState<string>("");
  const [offerModalOpen, setOfferModalOpen] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage({ type: "text", message });
      setMessage("");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
        padding: "10px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        maxWidth: { lg: "80%" },
        border: "1px solid #ccc",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography variant="body1" sx={{ color: "black" }}>
            Create Offer
          </Typography>
          <IconButton sx={{ color: "black" }} onClick={() => setOfferModalOpen(true)}>
            <AddCircleIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px", gap: "10px" }}>
        <TextField
          fullWidth
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{ sx: { height: "35px", backgroundColor: "#f5f5f5" } }}
          sx={{ borderRadius: "12px", paddingLeft: "10px", paddingRight: "10px" }}
        />
        <Button sx={{ backgroundColor: "white", color: "black", border: "2px solid black" }} onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
      <Divider sx={{ marginTop: "10px", backgroundColor: "#ccc" }} />

      {/* Offer Modal Component */}
      <OfferModal open={offerModalOpen} onClose={() => setOfferModalOpen(false)} sendOffer={sendOffer} />
    </Box>
  );
};

export default CommentBox;
