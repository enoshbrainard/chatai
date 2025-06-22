"use client";
import React, { useState, useEffect, useRef, createContext } from "react";
import Layout from "./layout";

export const ChatContext = createContext();

export default function ChatProvider({ children }) {
  const [message, setMessage] = useState("");
  const [chatmessages, setChatMessages] = useState([]);
  const [userid, setUserId] = useState("");
  const messageEndRef = useRef(null);

  const handleChange = (e) => setMessage(e.target.value);

  const handleClick = async () => {
    if (!message.trim()) return;
    const newMessages = [...chatmessages, { send: "user", text: message }];
    setChatMessages(newMessages);
    setMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("failed to connect");
      const data = await response.json();

      setChatMessages((prev) => [
        ...prev,
        { send: "chatbot", text: data.reply },
      ]);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/history`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ messages: chatmessages }),
        }
      );

      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message);

      alert("Saved!");
      setChatMessages([]);
      // setUserId(data.userId);
    } catch (e) {
      console.log("Failed to save history", e);
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatmessages]);

  return (
    <ChatContext.Provider
      value={{
        message,
        handleChange,
        handleClick,
        handleSave,
        chatmessages,
        setChatMessages,
        userid,
        setUserId,
        messageEndRef,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
