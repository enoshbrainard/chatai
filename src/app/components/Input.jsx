import React, { useContext } from "react";
import { ChatContext } from "../chat/Context";

export default function Input() {
  const { message, handleChange, handleSave, handleClick } =
    useContext(ChatContext);
  return (
    <div className="flex mt-3">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
        className="flex-1 bg-gray-800 text-white px-4 py-2 rounded focus:outline-none"
      />
      <button
        className="ml-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        onClick={handleClick}
      >
        Send
      </button>
      <button
        className="ml-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
