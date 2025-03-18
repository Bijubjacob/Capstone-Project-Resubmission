import express from 'express';
import { check, validationResult } from 'express-validator';
import User from '../../models/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth.mjs';

const router = express.Router();

// @route   GET /api/auth/user
// @desc    Get Authenticated User Info
// @access  Private
router.get('/user', auth, async (req, res) => {
    try {
        // Get User info from DB using user ID from req.user.
        const user = await User.findById(req.user.id).select('-password');

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

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter both email and password' });
        }

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
                },
            };

            // Sign access token (expires in 1 hour)
            const accessToken = jwt.sign(payload, process.env.jwtSecret, {
                expiresIn: '1h', // Access token expires in 1 hour
            });

            // Sign refresh token (expires in 7 days)
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
                expiresIn: '7d', // Refresh token expires in 7 days
            });

            // Store the refresh token in an HttpOnly cookie
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true, // Prevent JavaScript access
                secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
                sameSite: 'Strict', // Only send cookies in same-site requests
                maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expires in 7 days
            });

            // Send the access token in the response
            res.json({ accessToken });
        } catch (err) {
            console.error(err);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

// @route   POST /api/auth/refresh-token
// @desc    Refresh Access Token using Refresh Token
// @access  Private
router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.cookies['refresh_token']; // Assuming the refresh token is stored in a cookie

    if (!refreshToken) {
        return res.status(401).json({ msg: 'No refresh token found, please log in again' });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Find the user based on the decoded id
        const user = await User.findById(decoded.user.id);

        if (!user) {
            return res.status(401).json({ msg: 'User not found, please log in again' });
        }

        // Create a new access token
        const payload = {
            user: {
                id: user.id,
            },
        };

        const newAccessToken = jwt.sign(payload, process.env.jwtSecret, {
            expiresIn: '1h', // Access token expires in 1 hour
        });

        // Return the new access token
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        console.error(err);
        res.status(403).json({ msg: 'Invalid refresh token' });
    }
});

// @route   POST /api/auth/logout
// @desc    Logout User and clear the JWT token
// @access  Private
router.post('/logout', (req, res) => {
    // Clear the JWT token from cookies
    res.clearCookie('token', { path: '/' });

    // Send response indicating successful logout
    res.status(200).json({ msg: 'Successfully logged out' });
});

export default router;
