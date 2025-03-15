import express from 'express';
import { check, validationResult } from 'express-validator';
import User from '../../models/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth.mjs';

const router = express.Router();

// @route   GET /api/auth/user
// @desc    Authenticate User Route
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
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});

// @route   POST /api/auth/login
// @desc    Login User Route
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password required').not().isEmpty(),
    ],
    async (req, res) => {
        let errors = validationResult(req);

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
                    role: user.role,
                },
            };

            // Sign JWT and send it back
            jwt.sign(
                payload,
                process.env.jwtSecret, // Make sure you have a valid jwtSecret in your .env
                { expiresIn: 360000 }, // Token expiration time
                (err, token) => {
                    if (err) throw err;

                    res.json({ token });
                }
            );
        } catch (err) {
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

export default router;
