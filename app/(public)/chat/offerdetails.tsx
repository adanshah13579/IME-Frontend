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
}

const OfferCard: React.FC<OfferCardProps> = ({ offerId, senderType, time, avatar, selectedUserId }) => {
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
      <Avatar src={avatar} alt={senderType} sx={{ width: 25, height: 25 }} />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: isDoctor ? "flex-end" : "flex-start" }}>
        <Typography sx={{ fontSize: { xs: 10, sm: 12 }, fontWeight: "bold", color: "black", display: "flex", alignItems: "center", gap: 1 }}>
        {senderType || "Unknown User"}
          <Typography sx={{ fontSize: { xs: 10, sm: 12 }, color: "black" }}>{time || "Unknown Time"}</Typography>
         
        </Typography>

        <Card sx={{ marginTop: "10px", padding: "15px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#f9f9f9", maxWidth: "350px", width: "100%", alignSelf: isDoctor ? "flex-end" : "flex-start" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>
              {offer?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px", fontWeight: 500 }}>
              Profession: <strong>{offer?.profession}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px" }}>
              Price: <strong>${offer?.price}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px" }}>
              Schedule: <strong>{offer?.schedule}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px", color: "#555" }}>
              Description: {offer?.description}
            </Typography>

            {offer?.status && (
              <>
                <Typography sx={{ marginTop: "10px", fontWeight: "bold", color: offer.status === "Accepted" ? "green" : offer.status === "Rejected" ? "red" : "black" }}>
                  {offer.status}
                </Typography>
                {offer.status === "Active" && !isDoctor && (
                  <Box sx={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" color="primary" sx={{ textTransform: "none", borderRadius: "20px", padding: "8px 15px", boxShadow: 2 }} onClick={() => handleOpenModal("accept")}>
                      Accept
                    </Button>
                    <Button variant="outlined" color="error" sx={{ textTransform: "none", borderRadius: "20px", padding: "8px 15px", boxShadow: 2 }} onClick={() => handleOpenModal("reject")}>
                      Reject
                    </Button>
                  </Box>
                )}
              </>
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
