import React from "react";
import Chatbox from "../components/Chatbox";
import Siddebar from "../components/Siddebar";
export default function page() {
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <Chatbox />
      </div>
    </>
  );
}
