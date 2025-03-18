import express from 'express';
import auth from '../../middleware/auth.mjs';
import { upload, uploadToCloudinary } from '../../middleware/upload.mjs';
import Profile from '../../models/Profile.mjs';
import User from '../../models/User.mjs';
import validateProfileUpdate from '../../utils/validation.mjs';

const router = express.Router();

// Apply auth middleware to all profile routes
router.use(auth);

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found, please create one' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/profile/upload-profile-picture
// @desc    Upload profile picture to Cloudinary and update the profile
// @access  Private
router.post('/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { profilePicture: result.secure_url },
      { new: true, upsert: true }
    );

    res.status(200).json({ msg: 'Profile picture uploaded successfully', profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/profile
// @desc    Create or update the current user's profile
// @access  Private
router.post('/', async (req, res) => {
  try {
    // Validate incoming data
    const { errors, isValid } = validateProfileUpdate(req.body);
    if (!isValid) {
      return res.status(400).json(errors); // Send validation errors
    }

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({ msg: 'Profile updated successfully', profile });
    }

    profile = new Profile({
      user: req.user.id,
      ...req.body,
    });

    await profile.save();
    return res.status(201).json({ msg: 'Profile created successfully', profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
