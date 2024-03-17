"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const router = useRouter()
  const [data, setData] = useState("nothing")
  const getUserDetails = async () => {
    const res = await axios.get('/api/user/me')
    setData(res.data.data.name)
}
  return (
    <div className=' w-full h-screen justify-center items-center flex'>
    <div className=' space-y-3  flex justify-center items-center flex-col max-w-64 p-8 border-2 border-black rounded-lg'>
      <h1 className=' font-bold text-lg'>MAINPAGE</h1>
      <h2>{data === "nothing" ? "Nothing" : data} </h2>
            <button className=' text-white bg-orange-500 p-2 rounded-lg' onClick={getUserDetails}>Details</button>
    </div></div>
  )
}

export default page