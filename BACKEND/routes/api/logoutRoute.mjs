import express from 'express';

const router = express.Router();

// @route   POST /api/auth/logout
// @desc    Logout user (invalidate refresh token)
// @access  Private
router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');  // Clear the refresh token cookie
    res.json({ msg: 'Logged out successfully' });
});

export default router;
