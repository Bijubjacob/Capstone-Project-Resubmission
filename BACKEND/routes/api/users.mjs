import express from 'express';
import { check, validationResult } from 'express-validator';
import User from '../../models/User.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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
// @access  Public
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
            // Check if user already exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
            }

            // Create new user instance
            user = new User({
                name,
                email,
                password,
                isVerified: false, // Email verification flag
            });

            // Create a salt - Number of encryption rounds it goes through
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);  // Hash the password

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
                { expiresIn: '1h' }, // Token expiration time (1 hour)
                async (err, token) => {
                    if (err) throw err;

                    // Generate the email verification token
                    const verificationToken = jwt.sign(
                        { userId: user.id },
                        process.env.jwtSecret,  // Secret key for JWT
                        { expiresIn: '1h' }    // Token expiration time (1 hour)
                    );

                    // Create the verification link
                    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

                    // Send email with verification link
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

                    // Respond with the token
                    res.json({ token, msg: 'User registered successfully. Please check your email to verify your account.' });
                }
            );
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: [{ msg: 'Server Error' }] });
        }
    }
);

export default router;
