"use client";
import { useContext } from "react";
import { ChatContext } from "../chat/Context";
export default function Chatbox() {
  const { chatmessages, messageEndRef } = useContext(ChatContext);
  return (
    <div className="min-h-screen flex flex-col justify-between  bg-neutral-900 w-full">
      <div className="flex-1 overflow-y-auto space-y-2 p-4">
        {chatmessages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.send === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`p-2 rounded-lg max-w-xs ${
                msg.send === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}
