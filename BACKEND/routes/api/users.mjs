import express from 'express';
import { check, validationResult } from 'express-validator';
import User from '../../models/User.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register User Route (only 'user' role can be assigned here)
// @access  Public (anyone can register, but only as a user)
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if the user already exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
            }

            // The role is always 'user' for regular user registration
            const userRole = 'user';

            // Create a new user instance
            user = new User({
                name,
                email,
                password,
                role: userRole,  // Defaulting to 'user'
            });

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Save user to database
            await user.save();

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
                { expiresIn: '1hr' }, // Expiry time for the JWT
                (err, token) => {
                    if (err) throw err;

                    // Respond with the token
                    res.json({ token, msg: 'User registered successfully.' });
                }
            );
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: [{ msg: 'Server Error' }] });
        }
    }
);

export default router;
