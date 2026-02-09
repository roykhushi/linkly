import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
// Extract token from Authorization header
// Verify JWT
// Find user by id
// Attach to req.user
// If fail → 401


export  async function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if(!auth) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid" });
    }
}