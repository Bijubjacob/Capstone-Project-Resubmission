import axios from "axios";

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your-upload-preset");

  try {
    const response = await axios.post("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};
