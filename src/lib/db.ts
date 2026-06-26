import { connect } from "mongoose"

//Summary: TypeScript is mainly for better developer experience (type checking, autocomplete, error detection). The final code that runs in Node.js or the browser is always JavaScript.
let mongodbUrl=process.env.MONGODB_URL 
if(!mongodbUrl){
    throw new Error("Mongodb url is not found")
}

let cached=global.mongoose
if(!cached){
    cached=global.mongoose={conn:null,promise:null}
}
const connectDb=async()=>{
    if(cached.conn){
        // console.log(" cached db connected")
        return cached.conn
    }
    if(!cached.promise){
        cached.promise=connect(mongodbUrl).then((c)=>c.connection)
    }
    try {
        cached.conn=await cached.promise
        // console.log("db connected")
    } catch (error) {
        throw error
    }
    return cached.conn
}
export default connectDb
// Mongoose must:
// Find the MongoDB server.
// Open a TCP connection.
// Send authentication credentials.
// Wait for MongoDB to verify them.
// Establish the connection.
// All of this may take milliseconds or even seconds.


// UDP is used where speed matters more than perfect delivery:
// Video streaming
// Online games
// Voice calls
// Live broadcasts
// Losing a few packets is acceptable.

// Promise<Mongoose>   :connect(mongodbUrl)
//         ↓
//       .then()
//         ↓
// Promise<Connection>


// Express:
// Start once
// ↓
// Server stays alive
// ↓
// MongoDB connects once

// Next.js (dev):
// File change
// ↓
// Module re-executes
// ↓
// Connection code may run again
// ↓
// Need connection caching