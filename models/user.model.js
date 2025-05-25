import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: [true, `User's name is required`],
        trim: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, `User's email is required`],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, `Invalid email`],
    },
    password: {
        type: String,
        required: [true, `Password is required`],
        minLength: 6,
    }

}, { timestamps: true });

export const User = mongoose.model('User', userSchema)