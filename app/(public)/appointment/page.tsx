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
} from "@mui/material";
import { getDoctorOffers, getDoctorById } from "../../API/doctorApi"; // Ensure you have this API function

interface Order {
  _id: string;
  name: string;
  profession: string;
  status: string;
  doctorId?: string;
  doctorName?: string;
  doctorPhone?: string;
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const offers: Order[] = await getDoctorOffers();
        console.log("Fetched orderData:", offers); // Debugging log

        const updatedOrders = await Promise.all(
          offers.map(async (order) => {
            if (order.doctorId) {
              try {
                const doctor = await getDoctorById(order.doctorId);
                return { 
                  ...order, 
                  doctorName: doctor.name || "Unknown", 
                  doctorPhone: doctor.phone || "N/A" 
                };
              } catch (error) {
                console.error(`Error fetching doctor ${order.doctorId}:`, error);
                return { ...order, doctorName: "Unknown", doctorPhone: "N/A" };
              }
            }
            return { ...order, doctorName: "Not Assigned", doctorPhone: "N/A" };
          })
        );

        setOrderData(updatedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

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
              <TableCell sx={{ fontWeight: "bold" }}> Your Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Profession</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Doctor Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Doctor Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Order Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData
              .filter((order) => order.status !== "Active")
              .map((order) => (
                <TableRow key={order._id} sx={{ "&:hover": { backgroundColor: "#f1f1f1" } }}>
                  <TableCell sx={{ fontWeight: "bold" }}>{order.name}</TableCell>
                  <TableCell>{order.profession}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>{order.doctorName}</TableCell>
                  <TableCell>{order.doctorPhone}</TableCell>
                  <TableCell sx={{ color: getStatusColor(order.status), fontWeight: "bold" }}>
                    {order.status}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersPage;
