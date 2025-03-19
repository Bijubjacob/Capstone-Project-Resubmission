import express from 'express';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import User from '../../models/User.mjs';
import auth from '../../middleware/auth.mjs';
import admin from '../../middleware/admin.mjs';  // Middleware to check if user is an admin

const router = express.Router();

// @route   POST /api/admin/users
// @desc    Create new user (only accessible by admins)
// @access  Private (only admin can create users)
router.post(
    '/users',
    [
        auth,
        admin,
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

            // Handle role assignment (admins can assign the role)
            let userRole = 'user';
            if (role === 'admin') {
                if (!req.user || req.user.role !== 'admin') {
                    return res.status(403).json({ errors: [{ msg: 'Access denied, admin rights required' }] });
                }
                userRole = 'admin';
            }

            // Create new user instance
            user = new User({
                name,
                email,
                password,
                role: userRole,  // Assigned role
            });

            // Hash the password before saving
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Save user to database
            await user.save();

            res.json({ msg: 'User created successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: [{ msg: 'Server Error' }] });
        }
    }
);

// @route   GET /api/admin/users
// @desc    Get all users (only accessible by admins)
// @access  Private (only admin can access)
router.get('/users', [auth, admin], async (req, res) => {
    try {
        const users = await User.find().select('-password');  // Exclude passwords
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ errors: [{ msg: 'Server Error - Unable to fetch users' }] });
    }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user (only accessible by admins)
// @access  Private (only admin can update users)
router.put(
    '/users/:id',
    [auth, admin],
    async (req, res) => {
        try {
            const { name, email, role } = req.body;

            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ errors: [{ msg: 'User not found' }] });
            }

            user.name = name || user.name;
            user.email = email || user.email;
            user.role = role || user.role;

            // Save the updated user
            await user.save();
            res.json({ msg: 'User updated successfully' });
        } catch (err) {
            console.error('Error updating user:', err.message);
            res.status(500).json({ errors: [{ msg: 'Server Error - Unable to update user' }] });
        }
    }
);

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user (only accessible by admins)
// @access  Private (only admin can delete users)
router.delete('/users/:id', [auth, admin], async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ errors: [{ msg: 'User not found' }] });
        }

        await user.remove();
        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).json({ errors: [{ msg: 'Server Error - Unable to delete user' }] });
    }
});

export default router;
