"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const { _id } = useParams(); // gets chatid from URL
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getchatbyid?chatid=${_id}`
        );
        const data = await res.json();
        setMessages(data.messages);
      } catch (e) {
        console.error("Failed to fetch chat:", e.message);
      }
    };

    fetchMessages();
  }, [_id]);

  return (
    <div className="p-4">
      {messages.map((msg, index) => (
        <div
          key={msg._id || index}
          className={`p-2 rounded-md w-fit mb-2 ${
            msg.send === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
