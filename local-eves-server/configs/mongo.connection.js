import mongoose from "mongoose";
import "dotenv/config";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database", connect.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};