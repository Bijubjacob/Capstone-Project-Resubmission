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
// After user registration, create or update the profile using the JWT user ID
router.get('/', auth, async (req, res) => {
  try {
    const userIdFromJWT = req.user.id; // This comes from the decoded JWT token

    // Ensure the profile is associated with the correct user ID
    let profile = await Profile.findOne({ user: userIdFromJWT });

    if (!profile) {
      profile = new Profile({
        user: userIdFromJWT,  // Ensure the user ID from JWT is used
        firstName: 'John',
        lastName: '',
        email: 'user@example.com',
      });

      await profile.save();
      return res.status(201).json({ msg: 'Profile created successfully', profile });
    }

    res.json(profile);  // Return the existing profile
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
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

    // Upload the image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Ensure the profile is correctly linked to the logged-in user
    let profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found, please create one' });
    }

    // Update the profile with the new profile picture URL
    profile.profilePicture = result.secure_url;
    await profile.save();

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
      // If the profile exists, update it
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({ msg: 'Profile updated successfully', profile });
    }

    // If the profile doesn't exist, create a new one
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

// PUT route to update user profile and optionally upload a profile picture
router.put("/", upload.single('profilePicture'), async (req, res) => {
  try {
    const { firstName, lastName, email, bio, phoneNumber, location, settings } = req.body;
    let profilePictureUrl = req.body.profilePicture; // Default profile picture URL if not uploading

    // If a new profile picture is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      profilePictureUrl = result.secure_url; // Get the URL of the uploaded image
    }

    // Find the profile by user ID
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Update the profile fields
    profile.firstName = firstName || profile.firstName;
    profile.lastName = lastName || profile.lastName;
    profile.email = email || profile.email;
    profile.bio = bio || profile.bio;
    profile.phoneNumber = phoneNumber || profile.phoneNumber;
    profile.location = location || profile.location;
    profile.settings = settings || profile.settings;
    profile.profilePicture = profilePictureUrl || profile.profilePicture;

    // Save the updated profile
    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

export default router;
