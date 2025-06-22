"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Enosh AI Chatbot
      </h1>
      <p className="text-gray-600 mb-8 text-center px-4">
        Your smart assistant powered by Google Gemini. Chat, ask, and learn in
        real-time!
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/register")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>
      </div>

      <button
        onClick={() => router.push("/chat")}
        className="mt-8 underline text-blue-700 hover:text-blue-900"
      >
        Go to Chatbot
      </button>
    </div>
  );
}
