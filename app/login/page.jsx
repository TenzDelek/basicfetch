'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function page() {
  const router = useRouter();
  const [loading,setloading]=useState(false)
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const onlogin = async () => {
    try {
        setloading(true)
      const res1 = await axios.post("/api/user/login", user);
      console.log("Sign up successful:", res1.data); // Log successful response
      router.push("/");
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally{
        setloading(false)
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen w-full">
        <h1>{loading ? "Processing" : "Login"}</h1>
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
          onClick={onlogin}
          className="m-3 py-2 bg-black text-white rounded-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
