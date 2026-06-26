import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import User from "@/model/user.model";
import authOptions from "@/lib/auth";
export async function POST(req:NextRequest){
    try {
        await connectDb()
        const session=await getServerSession(authOptions)
        if(!session || !session.user.email || !session.user.id){
            return NextResponse.json(
                {message:"user does not have session"},
                {status:400}
        )
        }
        const formData=await req.formData()
        const name=formData.get("name") as string
        const file=formData.get("file") as Blob | null
        let imageUrl;
        if(file){
            imageUrl=await uploadOnCloudinary(file)
        }
        const user=await User.findByIdAndUpdate(session.user.id,{
            name,image:imageUrl
        },{new:true})
        if(!user){
            return NextResponse.json(
                {message:"user does not found"},
                {status:400}
        )
        }
        return NextResponse.json(
                user,
                {status:200}
        )
    }

     catch (error) {
        return NextResponse.json(
                {message:`edit error ${error}`},
                {status:500}
        )
    }
}