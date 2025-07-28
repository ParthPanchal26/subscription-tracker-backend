import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/env.js'
import { User } from "../models/user.model.js";

const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            // console.log("Token got from headers");
        }
        
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
            // console.log("Token got from cookies");
        }
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized : no token" });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const user = await User.findById(decoded.userId);

        if (!user) return res.status(401).json({ success: false, message: "Unauthorized : no user" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ message: "Unauthorized!", error: error.message })
    }
}

export default authorize;