"use client";
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  padding: 8px 14px;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #1976d2;
  }
`;

interface OfferDetails {
  name: string;
  profession: string;
  price: string;
  schedule: string;
  estimatedHours: string;
  description: string;
}

interface OfferModalProps {
  open: boolean;
  onClose: () => void;
  sendOffer: (offer: { type: string } & OfferDetails) => void;
}

const OfferModal: React.FC<OfferModalProps> = ({ open, onClose, sendOffer }) => {
  const [offerDetails, setOfferDetails] = useState<OfferDetails>({
    name: "",
    profession: "",
    price: "",
    schedule: "",
    estimatedHours: "",
    description: "",
  });

  const handleSendOffer = () => {
    sendOffer({ type: "offer", ...offerDetails });
    onClose();
    setOfferDetails({ name: "", profession: "", price: "", schedule: "", estimatedHours: "", description: "" });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{ "& .MuiPaper-root": { borderRadius: 2, padding: 2 } }}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Create an Offer</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          {Object.keys(offerDetails).map(
            (key) =>
              key !== "schedule" && (
                <TextField
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={offerDetails[key as keyof OfferDetails]}
                  onChange={(e) => setOfferDetails({ ...offerDetails, [key]: e.target.value })}
                  sx={{
                    marginBottom: 2,
                    "& .MuiInputLabel-root": { color: "black" },
                    "& .MuiOutlinedInput-root": {
                      borderColor: "#000",
                      "&:hover fieldset": { borderColor: "#1976d2" },
                    },
                  }}
                />
              )
          )}

          <Box key="schedule">
            <label style={{ fontSize: "14px", color: "#757575", marginBottom: "4px", display: "block" }}>Schedule</label>
            <StyledDatePicker
              selected={offerDetails.schedule ? new Date(offerDetails.schedule) : null}
              onChange={(date) => setOfferDetails({ ...offerDetails, schedule: date ? date.toISOString() : "" })}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select schedule"
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", paddingBottom: 2, gap: 1 }}>
        <Button onClick={onClose} sx={{ bgcolor: "white", color: "black", height: 40, minWidth: 120, border: "1px solid black" }}>
          Cancel
        </Button>
        <Button onClick={handleSendOffer} sx={{ bgcolor: "white", color: "black", border: "1px solid black", "&:hover": { bgcolor: "grey.100" }, height: 40, minWidth: 120 }}>
          Send Offer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OfferModal;
