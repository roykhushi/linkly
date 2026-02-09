import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req,res,next){
    try {
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        } 
        //if user does not exist, create new user
        const hashedPswd = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashedPswd});
        return res.status(201).json({message: "Registered successfully", 
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            }});
    } catch (error) {
        next(error);
    }
}

export async function login(req,res,next){
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(401).json({message: "Invalid Credentials!"});
        }
        //if matched generate token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});

        return res.status(200).json({message: "Logged in successfully", token, user:{
            id:user._id,
            name:user.name,
            email:user.email,
        }});
    } catch (error) {
        next(error);
    }
}