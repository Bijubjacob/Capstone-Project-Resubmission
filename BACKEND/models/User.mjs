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
  // role: {
  //   type: String,
  //   enum: ['user', 'admin'], // Can be 'user' or 'admin'
  //   default: 'user',         // Default to regular user
  // },
  isVerified: {
    type: Boolean,
    default: false, // Default value for unverified users
  },
}, { timestamps: true });


// Create the model based on the schema
const User = mongoose.model('user', UserSchema, 'users');

export default User;
