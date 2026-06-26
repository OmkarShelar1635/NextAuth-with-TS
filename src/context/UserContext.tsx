'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useState,useEffect } from 'react'
import axios from 'axios'

type userContextType = {
    user: userType | null | undefined,
    setUser: (user: userType) => void
}
type userType = {
    name: string,
    email: string,
    id: string,
    image?: string
}



export const userDataContext = React.createContext<userContextType | undefined>(undefined)

const UserContext = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userType | null>()
    const session=useSession()
    const data = {
        user, setUser
    }

    useEffect(() => {
        async function getUser() {
            try {
                const result = await axios.get("/api/user")
                setUser(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [session])
    return (
        <userDataContext.Provider value={data}>
      {children}
    </userDataContext.Provider>
    )
}

export default UserContext
