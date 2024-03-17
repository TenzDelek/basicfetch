'use client'
import {  useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const signup2 = async () => {
    try {
      const res1 = await axios.post("/api/user/signup", user);
      console.log("Sign up successful:", res1.data); // Log successful response
      router.push("/login");
    } catch (error) {
      console.error("Sign up failed:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Server responded with status:", error.response.status);
        console.error("Server responded with data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className='flex flex-col bg-gray-500 max-w-72 p-10 rounded-lg'>
        <input
          id="name"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Enter your name"
          className="m-2 p-2 rounded-lg outline-none"
        />
        <input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          className="m-2 p-2 rounded-lg outline-none"
          placeholder="Enter your password"
        />
        <button
          onClick={signup2}
          className="m-3 py-2 bg-black text-white rounded-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
