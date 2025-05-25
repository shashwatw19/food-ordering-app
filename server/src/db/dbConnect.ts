import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbConnect = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`Connected to ${connectionInstance?.connection?.name} database` )
    }catch(e){
        console.log(`error white connecting to database ` , e)
    }
}

export {dbConnect}