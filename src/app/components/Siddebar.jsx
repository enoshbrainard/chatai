"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { ChatContext } from "../chat/Context";
import { useRouter } from "next/navigation";
import { Global } from "../Globalcontext";

export default function Siddebar() {
  const router = useRouter();
  const { userid, setUserId } = useContext(Global);
  const [historydata, setHistoryData] = useState([]);
  const [activeId, setActiveId] = useState(null);
  console.log(userid);
  useEffect(() => {
    if (!userid) return;

    const fetchHistoryTitles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/gethistorytitles/?userid=${userid}`
        );
        if (!res.ok) {
          throw new Error("Failed to get data");
        }
        const data = await res.json();
        setHistoryData(data.history);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchHistoryTitles();
  }, [userid]);
  const newchart = () => {
    router.push("/chat");
  };

  return (
    <div className="w-[400px] min-h-screen bg-[#121212] text-white flex flex-col px-4 py-6">
      {/* New Chat Button */}
      <div className="mb-6">
        <button
          onClick={newchart}
          className="w-full bg-[#2d2d2d] hover:bg-[#3a3a3a] text-sm font-semibold py-2 rounded-xl transition"
        >
          + New Chat
        </button>
      </div>

      {/* Title */}
      <p className="text-sm text-gray-400 uppercase font-semibold mb-2">
        History Chats
      </p>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {Array.isArray(historydata) && historydata.length > 0 ? (
          historydata.map((chat) => (
            <Link
              key={chat._id}
              href={`/chat/${chat._id}`}
              onClick={() => setActiveId(chat._id)}
              className={`block px-3 py-2 rounded-lg text-sm truncate transition-all duration-150 ${
                activeId === chat._id
                  ? "bg-[#2a2a2a] text-white"
                  : "hover:bg-[#1e1e1e] text-gray-300"
              }`}
            >
              {chat.title}
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500 mt-4">No chat history yet.</p>
        )}
      </div>
    </div>
  );
}
