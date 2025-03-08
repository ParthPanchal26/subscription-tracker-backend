import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI)
    throw new Error('Please define your DB_URI in environment variables')

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to Database! | Mode: ${NODE_ENV} |`);
    } catch (error) {
        console.log(`DB connection error: ${error}`);
        process.exit(1);
    }
}