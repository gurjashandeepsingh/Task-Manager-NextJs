import mongoose from 'mongoose';
import dotenv from "dotenv";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/TaskManager-NextJs", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB TaskManager-Next.Js Database');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
