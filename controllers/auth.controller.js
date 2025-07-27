import mongoose from "mongoose"
import { User } from '../models/user.model.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { name, email, password, client } = req.body;

        if (!client) {
            const error = new Error("Client type is required (web OR mobile)");
            error.status = 400;
            throw error;
        }

        if (client !== "web" && client !== "mobile") {
            const error = new Error("Invalid client type");
            error.status = 400;
            throw error;
        }

        const existingUser = await User.findOne({ email });

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

        const userObj = newUsers[0].toObject();
        delete userObj.password;

        if (client === 'web') {
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000 * 24
            });

            return res.status(201).json({
                success: true,
                message: "User created successfully",
                auth: { user: userObj }
            });
        }

        if (client === 'mobile') {
            return res.status(201).json({
                success: true,
                message: "User created successfully",
                auth: { token: token, user: userObj }
            })
        }

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password, client } = req.body;

        if (!client) {
            const error = new Error("Client type is required (web OR mobile)");
            error.status = 400;
            throw error;
        }

        if (client !== "web" && client !== "mobile") {
            const error = new Error("Invalid client type");
            error.status = 400;
            throw error;
        }

        let user = await User.findOne({ email }).select('+password')

        if (!user) {
            const error = new Error("Invalid email or password");
            error.status = 404;
            throw error;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            const error = new Error("Invalid email or Password!");
            error.status = 400;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        const userObj = user.toObject();
        delete userObj.password;

        if (client === 'web') {
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000 * 24
            });

            return res.status(200).json({
                success: true,
                message: "User signed successfully",
                auth: {
                    user: userObj
                }
            });
        }

        if (client === 'mobile') {
            return res.status(200).json({
                success: true,
                message: "User signed in successfully!",
                auth: {
                    token: token,
                    user: userObj
                }
            })
        }

    } catch (error) {
        next(error)
    }
}

export const signOut = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    }).status(200).json({
        message: 'User signed out successfully'
    });
}