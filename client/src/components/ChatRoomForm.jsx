import { useState } from "react";
import apiClient from "@/lib/api-client";

const ChatRoomForm = ({ onRoomCreated }) => {
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = async () => {
    try {
      const response = await apiClient.post('/api/room/create', { name: roomName });
      onRoomCreated(response.data.room); // Notify parent about the new room
      setRoomName("");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="p-2 rounded bg-[#1d1528] text-white"
      />
      <button
        onClick={handleCreateRoom}
        className="p-2 ml-2 bg-[#7dca9b] text-white rounded"
      >
        Create Room
      </button>
    </div>
  );
};

export default ChatRoomForm;
