import Profile from '../models/Profile.mjs';
import { validationResult } from 'express-validator';
import validateProfileUpdate from '../utils/validation.mjs';

// Get current user's profile
export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create or update user profile
export const createProfile = async (req, res, validatedData) => {
    const { firstName, lastName, email, phoneNumber, bio, location } = validatedData;

    const profileFields = {
        user: req.user.id,
        firstName,
        lastName,
        email,
        phoneNumber,
        bio,
        location,
    };

    try {
        // Check if profile exists for the user
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update profile if it exists
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return profile; // Return updated profile
        }

        // Create new profile if it doesn't exist
        profile = new Profile(profileFields);
        await profile.save();
        return profile; // Return created profile
    } catch (err) {
        console.error(err.message);
        throw new Error('Server Error');
    }
};

// Update user profile
export const updateProfile = async (req, res, validatedData) => {
    const { firstName, lastName, email, phoneNumber, bio, location } = validatedData;

    const profileFields = {
        firstName,
        lastName,
        email,
        phoneNumber,
        bio,
        location,
    };

    try {
        // Check if profile exists for the user
        let profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            throw new Error('Profile not found');
        }

        // Update the profile
        profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
        );

        return profile; // Return the updated profile
    } catch (err) {
        console.error(err.message);
        throw new Error('Server Error');
    }
};