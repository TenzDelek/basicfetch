import { connecttoDB } from "@/database";
import { User } from "@/model/user.model";
import {  NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connecttoDB()

export async function POST(req){
    try {
        const reqbod=await req.json()
        const{name,password}=reqbod
        const user=await User.findOne({name})
        
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        const validPassword = await bcryptjs.compare
        (password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invlid password"}, {status: 400})
        }
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        const tokenData = {
            id: user._id,
            name: user.name,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}