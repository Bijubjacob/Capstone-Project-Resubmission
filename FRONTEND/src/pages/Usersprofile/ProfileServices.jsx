import axios from "axios";

// Replace with your actual Cloudinary Cloud Name and upload preset name
const CLOUD_NAME = "doixz4sgs";  // Your Cloudinary Cloud Name
const UPLOAD_PRESET = "ml_default";  // Replace with your specific upload preset if you created one

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);  // Using your upload preset

  try {
    // Making the POST request to Cloudinary's API to upload the image
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    
    // Returning the secure URL of the uploaded file
    return response.data.secure_url;
  } catch (error) {
    // Handling any errors that occur during the upload process
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};
