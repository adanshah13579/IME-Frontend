'use client'

import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { baseuri } from "@/app/Api/baseuri";

interface Offer {
  name: string;
  profession: string;
  price: number;
  schedule: string;
  description: string;
  status: string;
}

interface OfferCardProps {
  offerId: string;
  senderType: string;
  time?: string;
  avatar?: string;
  selectedUserId: string;
  headDetails: {
    name: string;
    image: string;
  };
}

const OfferCard: React.FC<OfferCardProps> = ({ offerId, senderType, time, selectedUserId, headDetails }) => {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"accept" | "reject" | "">("");

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`${baseuri}/api/offer/get-offer/${offerId}`);
        if (response.data.success) {
          setOffer(response.data.offer);
        } else {
          throw new Error("Offer data not found");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [offerId]);

  const handleOpenModal = (type: "accept" | "reject") => {
    setActionType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmAction = async () => {
    const token = Cookies.get("authToken");
    try {
      setLoading(true);
      const apiEndpoint =
        actionType === "accept" ? "/api/offer/accept-offer" : "/api/offer/reject-offer";
      const response = await axios.put(
        `${baseuri}${apiEndpoint}`,
        { offerId, userId: selectedUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOffer((prevOffer) =>
          prevOffer ? { ...prevOffer, status: actionType === "accept" ? "Accepted" : "Rejected" } : null
        );
      } else {
        throw new Error("Failed to perform action");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setModalOpen(false);
      setLoading(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const isDoctor = senderType === "user";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 2,
        backgroundColor: "white",
        flexDirection: isDoctor ? "row-reverse" : "row",
        justifyContent: isDoctor ? "flex-end" : "flex-start",
      }}
    >
      <Avatar src={headDetails?.image} alt={senderType} sx={{ width: 25, height: 25 }} />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: isDoctor ? "flex-end" : "flex-start" }}>
        <Typography sx={{ fontSize: { xs: 10, sm: 12 }, fontWeight: "bold", color: "black", display: "flex", alignItems: "center", gap: 1 }}>
          {headDetails?.name || "Unknown User"}
          <Typography sx={{ fontSize: { xs: 10, sm: 12 }, color: "black" }}>{time || "Unknown Time"}</Typography>
        </Typography>

        <Card sx={{ marginTop: "10px", padding: "15px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#f9f9f9", maxWidth: "350px", width: "100%", alignSelf: isDoctor ? "flex-end" : "flex-start" }}>
  <CardContent>
    <Typography variant="h6" sx={{ fontWeight: "bold", color: "black", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      Offer
      {offer?.status && (
       <span style={{ color: offer.status === "Accepted" ? "green" : offer.status === "Rejected" ? "red" : "black", fontSize: "16px", fontWeight: "bold" }}>
           Status:{offer.status}
        </span>
      )}
    </Typography>

    <Typography variant="body2" sx={{ marginTop: "5px", fontWeight: 500, color: "grey" }}>
      Name: <span style={{ color: "black" }}>{offer?.name}</span>
    </Typography>
    <Typography variant="body2" sx={{ marginTop: "5px", fontWeight: 500, color: "grey" }}>
      Profession: <span style={{ color: "black" }}>{offer?.profession}</span>
    </Typography>
    <Typography variant="body2" sx={{ marginTop: "5px", color: "grey" }}>
      Price: <span style={{ color: "black" }}>${offer?.price}</span>
    </Typography>
    <Typography variant="body2" sx={{ marginTop: "5px", color: "grey" }}>
      Schedule: <span style={{ color: "black" }}>{offer?.schedule}</span>
    </Typography>
    <Typography variant="body2" sx={{ marginTop: "10px", color: "grey" }}>
      Description: <span style={{ color: "black" }}>{offer?.description}</span>
    </Typography>

    {offer?.status === "Active" && !isDoctor && (
      <Box sx={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
        <Button sx={{ textTransform: "none", borderRadius: "10px", padding: "5px 15px", boxShadow: 2, backgroundColor: "white", color: "black", border: "1px solid black" }} onClick={() => handleOpenModal("accept")}>
          Accept
        </Button>
        <Button sx={{ textTransform: "none", borderRadius: "10px", padding: "5px 15px", boxShadow: 2, backgroundColor: "white", color: "black", border: "1px solid black" }} onClick={() => handleOpenModal("reject")}>
          Reject
        </Button>
      </Box>
    )}
  </CardContent>
</Card>


      </Box>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to {actionType} this offer?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
          <Button onClick={handleConfirmAction} color={actionType === "accept" ? "primary" : "error"}>{actionType === "accept" ? "Accept" : "Reject"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OfferCard;
