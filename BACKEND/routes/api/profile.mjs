import express from 'express';
import auth from '../../middleware/auth.mjs';
import { getProfile, createProfile, updateProfile } from '../../controllers/profileController.mjs';
import { upload, uploadToCloudinary } from '../../middleware/upload.mjs';
import validateProfileUpdate from '../../utils/validation.mjs';
import Profile from '../../models/Profile.mjs';

const router = express.Router();

// Apply auth middleware to all profile routes
router.use(auth);

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await user.findById(req.user.id); // Assuming you have a User model
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
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

    // Upload the file to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Save the URL to the user's profile in the database
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { profilePicture: result.secure_url },
      { new: true, upsert: true }
    );

    // Respond with success and the updated profile
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
    // Validate profile data using Joi
    const { error, value } = validateProfileUpdate(req.body);

    if (error) {
      // If validation fails, return error details
      return res.status(400).json({ errors: error.details });
    }

    // Check if a profile already exists
    const existingProfile = await Profile.findOne({ user: req.user.id });

    if (existingProfile) {
      // If profile exists, call the update method and return updated profile
      const updatedProfile = await updateProfile(req, res, value);
      return res.status(200).json({ msg: 'Profile updated successfully', updatedProfile });
    }

    // Otherwise, create a new profile using validated data
    const profile = await createProfile(req, res, value);
    return res.status(200).json({ msg: 'Profile created successfully', profile });

  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
});

// @route   PUT /api/profile
// @desc    Update the current user's profile
// @access  Private
router.put('/', async (req, res) => {
  try {
    // Validate profile data using Joi
    const { error, value } = validateProfileUpdate(req.body);

    if (error) {
      // If validation fails, return error details
      return res.status(400).json({ errors: error.details });
    }

    // Pass the validated data to the updateProfile function
    const updatedProfile = await updateProfile(req, res, value);

    return res.status(200).json({ msg: 'Profile updated successfully', updatedProfile });
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
});

export default router;
