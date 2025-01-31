"use client";

import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { chatList, moreChats } from "../../../data/dummydata.js"; 

const ChatDrawer = ({ setChatState }: { setChatState: () => void }) => {
  const [expandDirect, setExpandDirect] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <Box
      sx={{
        width: {
          xs: "100%", // Full width on mobile
          sm: 320, // Fixed width on larger screens
        },
        height: "92vh",
        borderRadius: "10px",
        backgroundColor: "white",
        color: "black",
        padding: "16px",
        overflowY: "auto",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontSize: { xs: "18px", sm: "20px" } }}>Chats</Typography>
      </Box>

      {/* Direct Messages Section */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle1" sx={{ color: "black", flex: 1, fontSize: { xs: "14px", sm: "16px" } }}>
          Direct Messages
        </Typography>
        <IconButton size="small" onClick={() => setExpandDirect(!expandDirect)} sx={{ color: "black" }}>
          {expandDirect ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Chat List */}
      <List sx={{ mt: 1 }}>
        {[...chatList, ...(expandDirect ? moreChats : [])].map((chat, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: activeChat === chat.name ? "#f0f0f0" : "white",
              mb: 1,
              borderRadius: "12px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            onClick={() => {
              setActiveChat(chat.name);
              setChatState(); // Open Chatbox
            }}
          >
            <ListItemAvatar>
              <Avatar src={chat.avatar} sx={{ width: 35, height: 35, mr: 1 }} />
            </ListItemAvatar>
            <ListItemText primary={chat.name} secondary={chat.time} />
            {chat.groupAvatar && (
              <ListItemAvatar>
                <Stack direction="row" spacing={-1}>
                  <Avatar src={chat.avatar} sx={{ width: 35, height: 35, border: "2px solid black" }} />
                  <Avatar src={chat.groupAvatar} sx={{ width: 25, height: 25, border: "2px solid black" }} />
                </Stack>
              </ListItemAvatar>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatDrawer;
