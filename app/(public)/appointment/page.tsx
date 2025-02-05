"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Modal,
  TextField,
  Box as MuiBox,
} from "@mui/material";
import { getDoctorOffers, getDoctorById } from "../../API/doctorApi";
import axios from 'axios';
import { baseuri } from "@/app/Api/baseuri";

interface Order {
  _id: string;
  name: string;
  profession: string;
  status: string;
  doctorId?: string;
  doctorName?: string;
  doctorPhone?: string;
  rated?: boolean; // Add a new field to track rating status
}

const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    Accepted: "blue",
    Completed: "green",
    Cancelled: "red",
  };
  return statusColors[status] || "#000";
};

const OrdersPage: React.FC = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [selectedOfferId, setSelectedOfferId] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const offers: Order[] = await getDoctorOffers();
        console.log("Fetched orderData:", offers);

        const updatedOrders = await Promise.all(
          offers.map(async (order) => {
            if (order.doctorId) {
              try {
                const doctor = await getDoctorById(order.doctorId);
                return {
                  ...order,
                  doctorName: doctor.name || "Unknown",
                  doctorPhone: doctor.phone || "N/A",
                  rated: false, // Initially set rated to false
                };
              } catch (error) {
                console.error(`Error fetching doctor ${order.doctorId}:`, error);
                return { ...order, doctorName: "Unknown", doctorPhone: "N/A", rated: false };
              }
            }
            return { ...order, doctorName: "Not Assigned", doctorPhone: "N/A", rated: false };
          })
        );

        setOrderData(updatedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmitRating = async () => {
    try {
      const response = await axios.put(`${baseuri}/api/offer/submit-rating/${selectedOfferId}`, {
        rating,
        description,
      });
      console.log("Rating submitted:", response.data);

      setOrderData((prevData) =>
        prevData.map((order) =>
          order._id === selectedOfferId ? { ...order, rated: true } : order
        )
      );

      setOpenModal(false);
      setRating(0);
      setDescription("");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          background: "linear-gradient(145deg, #F4FBFF, #FFFFFF)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Your Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Profession</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Doctor Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Doctor Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Order Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData
              .filter((order) => order.status !== "Active") // Filter out Active orders
              .map((order) => (
                <TableRow key={order._id} sx={{ "&:hover": { backgroundColor: "#f1f1f1" } }}>
                  <TableCell sx={{ fontWeight: "bold" }}>{order.name}</TableCell>
                  <TableCell>{order.profession}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>{order.doctorName}</TableCell>
                  <TableCell>{order.doctorPhone}</TableCell>
                  <TableCell sx={{ color: getStatusColor(order.status), fontWeight: "bold" }}>
                    {order.status}
                  </TableCell>
                  <TableCell>
                    {order.status === "Completed" && !order.rated && ( // Check if rated is false
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          setOpenModal(true);
                          setSelectedOfferId(order._id);
                        }}
                      >
                        Give Rating
                      </Button>
                    )}
                    {order.rated && <Typography color="green">Rated</Typography>} {/* Show Rated text */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Rating Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Submit Your Rating
          </Typography>
          <TextField
            label="Rating (1-5)"
            type="number"
            value={rating}
            onChange={handleRatingChange}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: 5 }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <MuiBox sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <Button  color="primary" onClick={handleSubmitRating}>
              Submit Rating
            </Button>
          </MuiBox>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrdersPage;
