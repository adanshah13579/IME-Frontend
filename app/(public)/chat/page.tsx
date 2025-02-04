'use client'
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns";
import ChatDrawer from "./ChatDrawer";
import Chatbox from "./ChatBox";
import { useSearchParams } from "next/navigation";


interface Chat {
  _id: string;
  name: string;
  image: string;
  lastMessage: string;
  lastMessageTime: string;
}

interface SelectedUser {
  id: string;
}

const ChatsystemPage: React.FC = () => {
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [recentChats, setRecentChats] = useState<Chat[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const [name, setName] = useState<string>("");

  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  console.log("doctorid",doctorId);
  

  const token = Cookies.get("token");
  const userId = "6796afec77b3bdaa687a0911";
  const userType = "user";

  useEffect(() => {
    if (doctorId && !selectedUser) {
      setSelectedUser({ id: doctorId });
      setChatOpen(true);
    }
  }, [doctorId, selectedUser]);


  useEffect(() => {
    if (!token) return;
    
    const newSocket: Socket = io("ws://localhost:3001?token=" + token, {
      transports: ["websocket"],
      forceNew: true,
      reconnectionAttempts: 5,
      timeout: 10000,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
      newSocket.emit("get_chat_list", { userId, userType });
    });

    newSocket.on("receive_message", (data: { type: string; chatlist: Chat[] }) => {
      if (data.type === "chatlist") {
        console.log("chatdrawer data", data);
        
        const formattedChats = data.chatlist.map((chat) => ({
          _id: chat._id,
          name: chat.name,
          image: chat.image,
          lastMessage: chat.lastMessage,
          lastMessageTime: chat.lastMessageTime,
        }));

        setRecentChats(formattedChats);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token, userId, userType]);

  const handleChatSelection = (chatId: string) => {
    setSelectedUser({ id: chatId });
    setChatOpen(true);
  };

  const handleName = (chatName: string) => {
    setName(chatName);
    setChatOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        justifyContent: "flex-start",
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          flex: 1,
          minWidth: "350px",
          backgroundColor: "white",
          p: 2,
          display: {
            xs: chatOpen ? "block" : "none",
            sm: "block",
          },
        }}
      >
        <ChatDrawer
          setChatState={handleChatSelection}
          setname={handleName}
          recentChats={recentChats}
        />
      </Box>

      <Box
        sx={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          backgroundColor: "white",
          p: 2,
        }}
      >
        {selectedUser && (
          <Chatbox
            setChatState={() => setChatOpen(!chatOpen)}
            selectedUser={selectedUser}
            name={name}
          />
        )}
      </Box>
    </Box>
  );
};

export default ChatsystemPage;
