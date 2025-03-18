import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User.mjs'; // Adjust path as per your project structure

const router = express.Router();

// Email verification route
router.get('/verify-email/:token', async (req, res) => {
    const { token } = req.params;

    console.log('Received token:', token);

    try {
        // Decode the JWT token to get the user ID
        const decoded = jwt.verify(token, process.env.jwtSecret);  // Updated environment variable name to `JWT_SECRET`
        console.log('Decoded JWT:', decoded); // Log decoded token to ensure it's correct

        // Find the user by decoded userId
        const user = await User.findById(decoded.userId);
        if (!user) {
            console.log('User not found with ID:', decoded.userId);
            return res.status(400).json({ errors: [{ msg: 'User not found' }] });
        }

        // Check if the user is already verified
        if (user.isVerified) {
            console.log('User already verified');
            return res.status(400).json({ errors: [{ msg: 'User already verified' }] });
        }

        // Update the user as verified
        user.isVerified = true;
        await user.save();

        // Send success response
        res.status(200).json({ success: true, msg: 'Email verified successfully' });
    } catch (err) {
        console.error('Error during verification:', err);
        // Handle JWT errors (invalid token or expired token)
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({ errors: [{ msg: 'Token has expired' }] });
        }
        return res.status(400).json({ errors: [{ msg: 'Invalid or expired token' }] });
    }
});

export default router;
