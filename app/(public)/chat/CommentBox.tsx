'use client'
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components"; // For custom styling

// Styled component for DatePicker to match Material UI TextField


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
  const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  padding: 8px 14px;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #1976d2; /* Change border color on focus */
  }
`;

  return (
    <Box sx={{
      position: "relative", bottom: 0, width: "100%", padding: "10px",
      backgroundColor: "white", display: "flex", flexDirection: "column",
      borderRadius: "10px", maxWidth: { lg: "80%" }, border: "1px solid #ccc"
    }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: "10px" }}>
      
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
        <Button variant="contained" sx={{ backgroundColor: "black", color: "black" }} onClick={handleSendMessage}>Send</Button>
      </Box>
      <Divider sx={{ marginTop: "10px", backgroundColor: "#ccc" }} />
      <Dialog 
  open={offerModalOpen} 
  onClose={handleCloseOfferModal} 
  fullWidth 
  maxWidth="sm"
  sx={{ '& .MuiPaper-root': { borderRadius: 2, padding: 2 } }}
>
  <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}>Create an Offer</DialogTitle>
  <DialogContent>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      {/* Loop through offerDetails except "schedule" */}
      {Object.keys(offerDetails).map((key) =>
        key !== "schedule" ? (
          <TextField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            fullWidth
            variant="outlined"
            size="small"
            value={offerDetails[key]}
            onChange={(e) => setOfferDetails({ ...offerDetails, [key]: e.target.value })}
            sx={{
              marginBottom: 2,
              '& .MuiInputLabel-root': {
                color: 'black', // Label color black
              },
              '& .MuiOutlinedInput-root': {
                borderColor: '#000', // Border color black
                '&:hover fieldset': {
                  borderColor: '#1976d2', // Hover effect border color
                },
              },
            }}
          />
        ) : null
      )}

      {/* Custom DatePicker for Schedule, placed last */}
      <Box key="schedule">
        <label style={{ fontSize: "14px", color: "#757575", marginBottom: "4px", display: "block" }}>
          Schedule
        </label>
        <StyledDatePicker
          selected={offerDetails.schedule}
          onChange={(date) => setOfferDetails({ ...offerDetails, schedule: date })}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select schedule"
        />
      </Box>
    </Box>
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2, gap: 1 }}>
    <Button 
      onClick={handleCloseOfferModal} 
      sx={{
        bgcolor: 'white', 
        color: 'black', 
        height: 40,
        minWidth: 120, // Reduced width
        border: '1px solid black', // Ensure the border is visible
      }}
    >
      Cancel
    </Button>
    <Button 
      onClick={handleSendOffer} 
      
      sx={{
        bgcolor: 'white', 
        color: 'black', 
        border: '1px solid black', // Add black border
        '&:hover': { bgcolor: 'grey.100' },
        height: 40,
        minWidth: 120, // Reduced width
      }}
    >
      Send Offer
    </Button>
  </DialogActions>
</Dialog>


    </Box>
  );
};

export default CommentBox;
