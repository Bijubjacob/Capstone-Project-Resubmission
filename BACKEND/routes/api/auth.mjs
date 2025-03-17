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

            // Check if user is verified
            if (!user.isVerified) {
                return res.status(400).json({ errors: [{ msg: 'Please verify your email before logging in' }] });
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

            // Sign JWT and send it back
            jwt.sign(
                payload,
                process.env.jwtSecret, // Make sure you have a valid JWT secret in your .env
                { expiresIn: '360000' }, // Token expiration time (1 hour)
                (err, token) => {
                    if (err) throw err;

                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

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
