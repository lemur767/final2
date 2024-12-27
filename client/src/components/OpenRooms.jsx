import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client"; // Axios instance
import { socket } from "@/utils/socket"; // Socket.IO instance
import { GET_ROOMS } from "@/utils/constants"; // API routes

const OpenRooms = ({onJoinRoom}) => {
  const [rooms, setRooms] = useState([]);

  // Fetch open rooms from backend
  const fetchRooms = async () => {
    try {
      const response = await apiClient.get(GET_ROOMS);
      console.log("Fetched rooms:", response.data);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();

    // Listen for real-time updates
    socket.on("update_rooms", ({ action, room, roomId }) => {
      console.log("Room update received:", { action, room, roomId });
      if (action === "create") {
        setRooms((prev) => [...prev, room]); // Add new room
      } else if (action === "delete") {
        setRooms((prev) => prev.filter((r) => r._id !== roomId)); // Remove deleted room
      }
    });

    return () => {
      socket.off("update_rooms"); // Cleanup on unmount
    };
  }, []);

  return (
  <div>
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div
            key={room._id}
            className="p-2 mb-2 bg-[#1d1528] rounded cursor-pointer hover:bg-[#7dca9b] hover:text-[#ab16ec] "
            onClick={() => onJoinRoom(room)}
          >
            <p className="font-bold">{room.name}</p>
            <p className="text-sm">Members: {room.members.length}</p>
          </div>
        ))
      ) : (
        <p>No open rooms available</p>
      )}
    </div>
  );
};

export default OpenRooms;
