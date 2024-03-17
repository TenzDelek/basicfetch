import { connecttoDB } from "@/database";
import { User } from "@/model/user.model";
import {  NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connecttoDB();

export async function POST(req) { //we are passing the state having the nameandpass
  try {
    const reqbody = await req.json();
    const { name, password } = reqbody; // corrected field name

    const user = await User.findOne({ name });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name, // corrected field name
      password: hashedPassword
    });
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
