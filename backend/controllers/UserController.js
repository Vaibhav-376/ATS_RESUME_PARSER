import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Users } from "../models/UserModel.js";



export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        console.log(name, email, password);

        const isUserExists = await Users.findOne({ email });
        if (isUserExists) {
            return res.status(400).json({
                message: "User Already Exists",
                success: false,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = await Users.create({
            name,
            email,
            password: hashedPassword,
        });


        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h", 
        });

        res.status(200).json({
            message: "User Registered Successfully",
            success: true,
            user: {
                name: user.name,
                email: user.email,
            },
            token, 
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials",
                success: false,
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Credentials",
                success: false,
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "User Logged In Successfully",
            success: true,
            user: {
                name: user.name,
                email: user.email,
            },
            token, 
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};