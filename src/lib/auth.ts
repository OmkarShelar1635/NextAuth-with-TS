import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDb from "./db"
import User from "@/model/user.model"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
//sign in

//email password
//email check===user exist
//check password
//signin successfully
//user data

const authOptions: NextAuthOptions = {
    providers: [
        //login kaise karoge
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                let email = credentials?.email
                let password = credentials?.password
                if (!email || !password) {
                    throw new Error("Email or password is not found")
                }
                await connectDb()
                let user = await User.findOne({ email })
                if (!user) {
                    throw new Error("User not found")
                }
                let isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    throw new Error("incorrect password")
                }
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }
            },
        }),
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        //token ke andar user details daali
        async signIn({account,user}){
            if(account?.provider=="google"){
                await connectDb()
                let existUser=await User.findOne({email:user?.email})
                if(!existUser){
                    let existUser=await User.create({
                        name:user.name,
                        email:user?.email
                    })
                }
                user.id=existUser._id as string
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.image = user.image
            }
            return token
        },
        //session ke andar user details daalega
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.image as string

            }
            return session
        }

    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, //30 days
    },
    pages: {
        signIn: '/login',
        error: '/login'
    },
    secret: process.env.NEXT_AUTH_SECRET
}
export default authOptions

// sign in
// |
// token generate
// |
// token ke andar user details daal di
// |
// session ke andar user ki deatils daalni hai token se

// MERN JWT Auth
// -------------
// You create token manually using jwt.sign()

// NextAuth JWT Strategy
// ---------------------
// NextAuth creates token automatically

// That's why in NextAuth you see callbacks like:
// async jwt({ token, user }) {
//     if (user) {
//         token.id = user.id
//     }
//     return token
// }
// You're modifying the token, not creating it from scratch. NextAuth already created the token and passed it to your callback.