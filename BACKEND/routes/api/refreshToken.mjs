import jwt from 'jsonwebtoken';
import express from 'express';

const router = express.Router();

// @route   POST /api/auth/refresh-token
// @desc    Refresh the access token using the refresh token
// @access  Public (requires the refresh token)
router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;  // Get refresh token from cookies

    if (!refreshToken) {
        return res.status(401).json({ errors: [{ msg: 'No refresh token, login again' }] });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.jwtSecret);
        const userId = decoded.user.id;

        // Generate a new access token
        const payload = { user: { id: userId } };

        const newAccessToken = jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1h' });

        // Send the new access token to the client
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        console.error(err);
        res.status(401).json({ errors: [{ msg: 'Invalid refresh token, login again' }] });
    }
});

export default router;
