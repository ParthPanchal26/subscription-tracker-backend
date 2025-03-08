import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: [true, `User's name is required`],
        trim: true,
        maxLength: 20,
    },
    email: {
        type: String,
        required: [true, `User's email is required`],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\s+@\s+\.\s+/, `Invalid email`],
    },
    password: {
        type: String,
        required: [true, `Password is required`],
        minLength: 8,
    }

}, {timestamps: true});

export const User = mongoose.model('User', userSchema)