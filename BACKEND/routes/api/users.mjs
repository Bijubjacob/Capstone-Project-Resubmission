import express from 'express';
import { check, validationResult } from 'express-validator';
import User from '../../models/User.mjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your email address
        pass: process.env.EMAIL_PASS,  // Your email password (use App Passwords if 2FA is enabled)
    },
});

// @route   POST /api/users/register
// @desc    Register User Route (with optional admin role)
// @access  Public or Protected (if the user is an admin)
router.post(
    '/register', // Add auth middleware to protect the route
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

        const { name, email, password, role } = req.body;

        try {
            // Check if user already exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
            }

            // Handle role assignment (same as before)
            let userRole = 'user';
            if (role === 'admin') {
                if (!req.user || req.user.role !== 'admin') {
                    return res.status(403).json({ errors: [{ msg: 'Access denied, admin rights required' }] });
                }
                userRole = 'admin';
            }

            // Create a new user instance
            user = new User({
                name,
                email,
                password, // Use plain text password - Mongoose will hash it automatically in the 'pre' hook
                role: userRole,
                isVerified: false, // Email verification flag
            });

            // Save the user to the database
            await user.save();

            // Create email verification token (JWT)
            const verificationToken = jwt.sign(
                { userId: user.id },
                process.env.jwtSecret,  // Secret key for JWT
                { expiresIn: '360000' }    // Expiration time for the token
            );

            // Create the verification link
            const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

            // Send verification email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Email Verification',
                text: `Please verify your email by clicking on the following link: ${verificationLink}`,
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error('Error sending email:', err);
                    return res.status(500).json({ msg: 'Email sending error' });
                }
                console.log('Verification email sent:', info.response);
            });

            // Send response
            res.status(200).json({ msg: 'User registered successfully, please check your email to verify your account' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

export default router;