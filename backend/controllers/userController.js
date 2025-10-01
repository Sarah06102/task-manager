// Logic for user creation/login
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const sign = (uid) => jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn: "7d"});

// Register user and save user info to db
export const registerUser = async (req, res) => {
    try {
        // Get entered user info
        const { firstName, lastName, email, password } = req.body || {};

        // If any of the required user info is not entered, throw error
        if (!firstName || !lastName || !email || !password) return res.status(400).json({message: "All fields are required."});

        // Find the user if exists in db
        const exists = await User.findOne({ email });
        
        // If the user exists, return message
        if (exists) return res.status(409).json({message: "Email already in use."});

        // Hash password for security
        const hash = await bcrypt.hash(password, 10);
        // Create user
        const user = await User.create({firstName, lastName, email, password: hash});
        
        // Return response when user successfully created
        return res.status(201).json({
            user: {id: user._id, firstName, lastName, email},
            token: sign(user._id),
        });
    } catch (error) {
        // Return error if user not successfully created
        return res.status(500).json({message: "Server error"});
    }
};

// Log user in
export const loginUser = async (req, res) => {
    try {
        // Get entered user info
        const {email, password} = req.body || {};

        // If email and password not entered
        if (!email || !password) {
            return res.status(400).json({ok: false, message: `Email and password are required`});
        }

        // Find user in db by email
        const user = await User.findOne({email});
        // If user with entered email is not found
        if (!user) return res.status(404).json({message: "Email not found. Please try again."});
        
        // Compare saved password in db to entered password
        const ok = await bcrypt.compare(password, user.password);
       
        // If passwords do not match
        if (!ok) return res.status(401).json({message: "Incorrect password entered. Please try again."});

        // If user is successfully able to log in
        return res.json({
            user: {id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email},
            token: sign(user._id),
        });
    } catch (error) {
        // Return error if user not successfully logged in
        return res.status(500).json({message: "Server error."});
    }
};

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("_id firstName lastName email").lean();
        if (!user) return res.status(404).json({message: "User not found."});
        return res.json({ok: true, user});
    } catch {
        return res.status(500).json({message: "Server error."});
    }
}