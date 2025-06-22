"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ChatContext } from "../chat/Context";
import { Global } from "../Globalcontext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { userid, setUserId, username, setUserName } = useContext(Global);

  const handleclick = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Important for cookie to be saved
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        console.log(data.user.id);
        setUserId(data.user.id);
        setUserName(data.user.name);
        router.push("/chat");
        // ✅ Navigate on successful login
      } else {
        throw new Error(data.message || "login failed");
      }
    } catch (e) {
      console.log(e.message);
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h2 className="text-2xl mb-4 font-bold">Login</h2>
      <div className="space-y-4 w-80">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleclick}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
