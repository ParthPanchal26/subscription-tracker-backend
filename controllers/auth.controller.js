import mongoose from "mongoose"
import { User } from '../models/user.model.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const error = new Error("User already exist! Please Sign-In!");
            error.status = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        await session.commitTransaction()
        session.endSession()

        res.status(201).cookie('token', token, {
            maxAge: 900000, httpOnly: true
        }).json({
            success: true,
            message: "User created successfully",
            user: {
                token,
                user: newUsers[0]
            }
        })
    } catch (error) {
        session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            const error = new Error("User does not exist! Please Sign-Up!");
            error.status = 404;
            throw error;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            const error = new Error("Invalid Password!");
            error.status = 400;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        res.status(200).cookie('token', token, {
            maxAge: 900000, httpOnly: true
        }).json({
            success: true,
            message: "User signed in successfully!",
            data: {
                token,
                user
            }
        })

    } catch (error) {
        next(error)
    }
}

export const signOut = (req, res) => {
    res.status(200).cookie('token', '').json({
        success: true,
        message: "User signed out successfully"
    })
}