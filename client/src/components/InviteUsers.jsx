import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { FaPersonCirclePlus } from "react-icons/fa6";

const InviteUsers = ({ roomId }) => {
  const [userIds, setUserIds] = useState(""); // Comma-separated user IDs

  const handleInviteUsers = async () => {
    try {
      const response = await apiClient.post('/api/room/invite', {
        roomId,
        userIds: userIds.split(',').map((id) => id.trim()),
      });
      console.log('Users invited:', response.data.room);
      setUserIds("");
    } catch (error) {
      console.error('Error inviting users:', error);
    }
  };

  return (
    <div className="flex flex-col flex-shrink-1 gap-4 p-4 bg-[#28223d]">
      <input
        type="text"
        placeholder="User IDs (comma-separated)"
        value={userIds}
        onChange={(e) => setUserIds(e.target.value)}
        className="p-2 rounded bg-[#1d1528] text-white"
      />
      <FaPersonCirclePlus 
        onClick={handleInviteUsers}
        className="p-2 ml-2 bg-[#7dca9b] text-white rounded"
      />
      
      
    </div>
  );
};

export default InviteUsers;
