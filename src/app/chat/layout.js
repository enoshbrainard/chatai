"use client";
import React from "react";

import Siddebar from "../components/Siddebar";
import Chatbox from "../components/Chatbox";
import Input from "../components/Input";
import ChatProvider from "./Context";
import { Global } from "../Globalcontext";
import { useContext } from "react";
export default function Layout({ children }) {
  const { username } = useContext(Global);
  return (
    <ChatProvider>
      <div className="flex h-screen overflow-hidden bg-black text-white">
        {/* Sidebar */}
        <div className="w-[400px] bg-black p-4">
          <Siddebar />
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <div className="h-16 bg-neutral-900 border-b border-gray-700 px-4 flex justify-between items-center">
            <button className="text-2xl px-4 py-2 rounded hover:bg-gray-700 mt-5">
              CHAT AI
            </button>

            <p className="text-2xl px-4 py-2 rounded hover:bg-gray-700 mt-5">
              {username}
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">{children}</div>

          {/* Input */}
          <div className="h-20 bg-gray-900 border-t border-gray-700 px-4 ">
            <Input />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}
