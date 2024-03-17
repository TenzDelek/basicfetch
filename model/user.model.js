import mongoose from "mongoose";
const Userschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],

    }
},
{
    timestamps:true
})

export const User= mongoose.models.User||mongoose.model("User",Userschema)