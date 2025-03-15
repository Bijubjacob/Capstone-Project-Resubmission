import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/auth_context";
import axios from "axios";

const ProfilePage = () => {
    const { cookies } = useAuth();
    const [profile, setProfile] = useState(null);
    const [profileName, setProfileName] = useState("");  // State for profile name edit
    const [profilePicture, setProfilePicture] = useState(null);  // State for the profile picture

    useEffect(() => {
        axios.get('http://localhost:3000/api/profile', {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
            },
        })
            .then((res) => {
                setProfile(res.data);
                setProfileName(res.data.name);  // Set the initial profile name to be editable
            })
            .catch((err) => console.error(err));
    }, [cookies]);

    // Update Profile
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { name: profileName };  // Send the updated name
            await axios.put('http://localhost:3000/api/profile', updatedData, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            });
            alert("Profile updated successfully");
        } catch (err) {
            console.error(err);
        }
    };

    // File Upload for Profile Picture
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setProfilePicture(file); // Update the profilePicture state with the selected file

        const formData = new FormData();
        formData.append("profilePicture", file);  // Assuming the field is 'profilePicture'

        try {
            await axios.post('http://localhost:3000/api/profile/upload-profile-picture', formData, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Profile picture uploaded successfully!");
        } catch (err) {
            console.error("Error uploading profile picture", err);
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            {profile ? (
                <div>
                    <form onSubmit={handleProfileUpdate}>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}  // Update profile name on change
                            />
                        </div>
                        <div>
                            <button type="submit">Update Profile</button>
                        </div>
                    </form>

                    <div>
                        <label htmlFor="profilePicture">Upload Profile Picture:</label>
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            onChange={handleFileUpload}  // Handle file change
                        />
                    </div>

                    <div>
                        <p>Name: {profile.name}</p>
                        <p>Email: {profile.email}</p>
                        {/* Display other profile data */}
                        {profile.profilePicture && (
                            <div>
                                <h3>Profile Picture</h3>
                                <img
                                    src={`http://localhost:3000/images/${profile.profilePicture}`}
                                    alt="Profile"
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfilePage;
