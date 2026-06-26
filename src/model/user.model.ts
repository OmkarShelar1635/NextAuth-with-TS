import mongoose from "mongoose";

interface IUser{
    _id?:mongoose.Types.ObjectId,
    name:string,
    image:string
    email:string
    password?:string
    createdAt?:Date,  //createdAt: Date | undefined
    updatedAt?:Date
}

// const userSchema = new mongoose.Schema(
//   {
//     // schema definition
//   },
//   {
//     // schema options
//   }
// );
const userSchema=new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:false
    },
    image:{
        type:String
    }
},{timestamps:true})


const User=mongoose.models.User || mongoose.model('User',userSchema) //This line creates a Mongoose model only if it doesn't already exist.
export default User;

