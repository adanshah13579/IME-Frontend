"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import ChatDrawer from "./ChatDrawer"; // Import from the same folder
import ChatBox from "./ChatBox"; // Import from the same folder

const ChatsystemPage = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "auto",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          minWidth: "350px",
          backgroundColor: "white",
          p: 2,
          display: {
            xs: chatOpen ? "" : "none",
            sm: "block",
          },
        }}
      >
        <ChatDrawer setChatState={() => setChatOpen(!chatOpen)} />
      </Box>

      {!chatOpen && (
        <Box
          sx={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            height: "auto",
            width: "100%",
            backgroundColor: "white",
            p: 2,
          }}
        >
          <ChatBox setChatState={() => setChatOpen(!chatOpen)} />
        </Box>
      )}
    </Box>
  );
};

export default ChatsystemPage;
