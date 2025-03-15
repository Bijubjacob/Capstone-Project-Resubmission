import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from '../utils/cloudinary.mjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();


// Multer memory storage to upload file directly to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(file.originalname.toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type! Only jpg, jpeg, and png are allowed.'));
    }
  },
});

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'profile_pictures', // Optional: specify folder for organization
        resource_type: 'image',     // Specify that it's an image
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export { upload, uploadToCloudinary };
