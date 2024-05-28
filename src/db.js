import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://busimaximiliano:zOytRW4yurgjNh47@cluster0.1nzlnn7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log(">>> DB is connected")
  } catch (error) {
    console.log(error)
  }
}
