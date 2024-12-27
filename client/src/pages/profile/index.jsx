
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { apiClient } from "@/lib/api-client";
import { UPDATE_PROFILE } from '@/utils/constants'

const Profile = () => {
  const { user, updateUser } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [imageURL, setImageURL] = useState(user?.imageURL || "");

  const handleUpdateProfile = async () => {
    try {
      const response = await apiClient.put(UPDATE_PROFILE, {
        firstName,
        lastName,
        email,
        imageURL,
      });
      updateUser(response.data); // Update the global user context
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="p-8 bg-[#1d1528] text-[#7dca9b]">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <div className="mb-4">
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="block w-full p-2 rounded bg-[#28223d] text-white mt-2"
        />
      </div>
      <div className="mb-4">
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="block w-full p-2 rounded bg-[#28223d] text-white mt-2"
        />
      </div>
      <div className="mb-4">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 rounded bg-[#28223d] text-white mt-2"
        />
      </div>
      <div className="mb-4">
        <label>Profile Image URL</label>
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className="block w-full p-2 rounded bg-[#28223d] text-white mt-2"
        />
      </div>
      <button
        onClick={handleUpdateProfile}
        className="p-2 bg-[#7dca9b] text-white rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
