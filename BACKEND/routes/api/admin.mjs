import express from 'express';
import { check, validationResult } from 'express-validator';  // Import validation library
import User from '../../models/User.mjs';
import auth from '../../middleware/auth.mjs';
import admin from '../../middleware/admin.mjs';  // Check if user is an admin

const router = express.Router();

// @route   GET /api/admin/users
// @desc    Get all users (only accessible by admins)
// @access  Private (only admin can access)
router.get('/users', [auth, admin], async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ errors: [{ msg: 'Server Error - Unable to fetch users' }] });
    }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user (only accessible by admins)
// @access  Private (only admin can delete users)
router.delete(
    '/users/:id',
    [
        auth,
        admin,
        check('id').isMongoId().withMessage('Invalid user ID')  // Validate the :id parameter
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ errors: [{ msg: 'User not found' }] });
            }

            await user.remove();
            res.json({ msg: 'User deleted successfully' }); // Return deleted user data for confirmation
        } catch (err) {
            console.error('Error deleting user:', err.message);
            res.status(500).json({ errors: [{ msg: 'Server Error - Unable to delete user' }] });
        }
    }
);

export default router;
