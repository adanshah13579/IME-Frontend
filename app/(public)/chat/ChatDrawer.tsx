import { Box, List, ListItem, Typography, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

interface Chat {
  _id: string;
  name: string;
  image?: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

interface ChatDrawerProps {
  setChatState: (id: string) => void;
  recentChats: Chat[];
  setname: (name: string) => void;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ setChatState, recentChats, setname }) => {
  const [expandDirect, setExpandDirect] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const handleChatSelection = (chat: Chat) => {
    setActiveChat(chat.name);
    setChatState(chat._id);
    setname(chat.name);
  };

  const truncateMessage = (message?: string, maxLength: number = 30): string => {
    return message && message.length > maxLength ? message.substring(0, maxLength) + "..." : message || "";
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 320 },
        height: "100vh",
        borderRadius: "10px",
        backgroundColor: "white",
        color: "black",
        padding: "16px",
        overflowY: "auto",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <Typography variant="h6" sx={{ fontSize: { xs: "18px", sm: "20px" } }}>
          Chats
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle1" sx={{ color: "black", flex: 1, fontSize: { xs: "14px", sm: "16px" } }}>
          Direct Messages
        </Typography>
        <IconButton size="small" onClick={() => setExpandDirect(!expandDirect)} sx={{ color: "black" }}>
          {expandDirect ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <List sx={{ marginTop: "8px" }}>
        {recentChats.length > 0 ? (
          recentChats.map((chat, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: activeChat === chat.name ? "#f0f0f0" : "white",
                margin: "10px 0",
                borderRadius: "12px",
                padding: "10px",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
              onClick={() => handleChatSelection(chat)}
            >
              <img
                src={chat.image || "/default-avatar.png"}
                alt={chat.name}
                style={{ width: 47, height: 47, borderRadius: "50%", marginRight: 5 }}
              />
              <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "14px", sm: "16px" }, fontWeight: 500 }}>
                    {chat.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "12px", color: "grey" }}>
                    {chat.lastMessageTime ? formatDistanceToNow(new Date(chat.lastMessageTime)) + " ago" : ""}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontSize: "14px", color: "grey", textAlign: "left", marginTop: "4px" }}>
                  {chat.lastMessage === "offer" ? "Sent you an offer card" : truncateMessage(chat.lastMessage)}
                </Typography>
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography>No recent chats</Typography>
        )}
      </List>
    </Box>
  );
};

export default ChatDrawer;
