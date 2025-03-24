import express from 'express';
import { check, validationResult } from 'express-validator';
import User from '../../models/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth.mjs'; // This is for authentication middleware

const router = express.Router();

// @route   GET /api/auth/user
// @desc    Get Authenticated User Info
// @access  Private
router.get('/user', auth, async (req, res) => {
    try {
        // Get User info from DB using user ID from req.user (set by the auth middleware)
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ errors: [{ msg: 'User not found' }] });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});

// @route   POST /api/auth/login
// @desc    Login User and return a JWT Token
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Find user by email
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Compare the entered password with the hashed password from the database
            const isMatch = await bcrypt.compare(password.trim(), user.password); // Using trim to remove extra spaces

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Create JWT payload
            const payload = {
                user: {
                    id: user.id,
                    role: user.role,
                },
            };

            const token = jwt.sign(
                payload,
                process.env.jwtSecret, // Make sure you have a valid JWT secret in your .env
                { expiresIn: '1h' }
            );

            // Generate refresh token (longer expiration, e.g., 7 days)
            const refreshToken = jwt.sign(payload, process.env.jwtSecret, { expiresIn: '7d' });

            // Store the refresh token securely in an HTTP-only cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // Cannot be accessed via JavaScript (prevents XSS attacks)
                secure: process.env.NODE_ENV === 'production', // Only set cookie over HTTPS in production
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration for the cookie
            });

            // Get the current server time in UTC format
            const serverTimeUTC = new Date().toISOString();

            // Convert UTC to Chicago time (CDT or CST)
            const serverTimeCDT = new Date(serverTimeUTC).toLocaleString("en-US", { timeZone: "America/Chicago" });

            // Decode the token to check if it's expired
            const decoded = jwt.decode(token);

            // Token expiration time (in milliseconds)
            const tokenExpirationTime = decoded.exp * 1000; // Expiration time in milliseconds
            const currentTime = Date.now(); // Current time in milliseconds

            // Check if the token has expired
            const tokenExpired = currentTime > tokenExpirationTime;


            // Send the response with token, server time, and token expiration status
            res.json({ token, serverTime: serverTimeCDT, tokenExpired });
        } catch (err) {

            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

export default router;
