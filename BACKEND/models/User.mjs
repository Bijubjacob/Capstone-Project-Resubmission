import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Email validation regex
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Can be 'user' or 'admin'
    default: 'user',         // Default to regular user
  },
  isVerified: {
    type: Boolean,
    default: false, // Default value for unverified users
  },
}, { timestamps: true });

// Encrypt the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();  // If the password is not modified, proceed to save
  }

  try {
    // Create a salt - Number of encryption rounds it goes through
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password
    next();  // Continue to save the user
  } catch (error) {
    next(error);  // If an error occurs, pass it to the next middleware
  }
});

// Add a method to compare the hashed password (useful for login)
UserSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password); // Compare password
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Create the model based on the schema
const User = mongoose.model('user', UserSchema, 'users');

export default User;
