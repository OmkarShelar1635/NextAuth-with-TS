import connectDb from "@/lib/db"
import User from "@/model/user.model"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

//status code
//200-300:success
//OK:200
//created:201

//frontend error:400-499
//Bad Request:400
//Unauthorized:401
//Not Found:404

//backend error:500-599
//Internal Server Error:500

export async function POST(request:NextRequest){
    try {
        const {name,email,password}=await request.json()
        await connectDb()
        let existUser=await User.findOne({email})
        if(existUser){
            return NextResponse.json(
                {message:"User already exist"},
                {status:400}
            )
        }

        if(password.length<6){
            return NextResponse.json(
                {message:"Password must be atleat 6 characters"},
                {status:400}
            )
        }
        const hashedPassord=await bcrypt.hash(password,10)
        const user=await User.create({
            name,email,password:hashedPassord
        })
        return NextResponse.json(
                user,
                {status:201}
            )


    } catch (error) {
        return NextResponse.json(
                {message:`register error :${error}`},
                {status:500}
            )
    }
}

//signup
//  |
//check exist user
//   |
//password check for 6 char (optional)
//   |
//hash password using bcryptjs
//   |
//user create
