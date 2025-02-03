import React, { useState } from "react";
import {
  Box,
  IconButton,
  Divider,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import MicIcon from "@mui/icons-material/Mic";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface OfferDetails {
  name: string;
  profession: string;
  price: string;
  schedule: string;
  estimatedHours: string;
  description: string;
}

interface CommentBoxProps {
  sendMessage: (message: { type: string; message: string }) => void;
  sendOffer: (offer: { type: string } & OfferDetails) => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({ sendMessage, sendOffer }) => {
  const [message, setMessage] = useState<string>("");
  const [offerModalOpen, setOfferModalOpen] = useState<boolean>(false);
  const [offerDetails, setOfferDetails] = useState<OfferDetails>({
    name: "",
    profession: "",
    price: "",
    schedule: "",
    estimatedHours: "",
    description: "",
  });

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage({ type: "text", message });
      setMessage("");
    }
  };

  const handleOpenOfferModal = () => setOfferModalOpen(true);
  const handleCloseOfferModal = () => setOfferModalOpen(false);

  const handleSendOffer = () => {
    sendOffer({ type: "offer", ...offerDetails });
    setOfferModalOpen(false);
    setOfferDetails({ name: "", profession: "", price: "", schedule: "", estimatedHours: "", description: "" });
  };

  return (
    <Box sx={{
      position: "relative", bottom: 0, width: "100%", padding: "10px",
      backgroundColor: "white", display: "flex", flexDirection: "column",
      borderRadius: "10px", maxWidth: { lg: "80%" }, border: "1px solid #ccc"
    }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <IconButton sx={{ color: "black" }}><AttachFileIcon /></IconButton>
          <IconButton sx={{ color: "black" }}><SentimentSatisfiedAltIcon /></IconButton>
          <IconButton sx={{ color: "black" }}><MicIcon /></IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography variant="body1" sx={{ color: "black" }}>Create Offer</Typography>
          <IconButton sx={{ color: "black" }} onClick={handleOpenOfferModal}><AddCircleIcon /></IconButton>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px", gap: "10px" }}>
        <TextField
          fullWidth variant="outlined" placeholder="Type a message" value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{ sx: { height: "35px", backgroundColor: "#f5f5f5" } }}
          sx={{ borderRadius: "12px", paddingLeft: "10px", paddingRight: "10px" }}
        />
        <Button variant="contained" sx={{ backgroundColor: "black", color: "white" }} onClick={handleSendMessage}>Send</Button>
      </Box>
      <Divider sx={{ marginTop: "10px", backgroundColor: "#ccc" }} />
      <Dialog open={offerModalOpen} onClose={handleCloseOfferModal}>
        <DialogTitle>Create an Offer</DialogTitle>
        <DialogContent>
          {Object.keys(offerDetails).map((key) => (
            <TextField
              key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}
              fullWidth value={offerDetails[key as keyof OfferDetails]}
              onChange={(e) => setOfferDetails({ ...offerDetails, [key]: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOfferModal}>Cancel</Button>
          <Button onClick={handleSendOffer} variant="contained" color="primary">Send Offer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CommentBox;
