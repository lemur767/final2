import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import OpenRooms from "./OpenRooms";
import Cookies from 'universal-cookie';
import { getDecodedToken } from "@/utils/auth";


const cookies = new Cookies();

const RoomActions = ({ onRoomCreated, onJoinRoom }) => {
  const [roomName, setRoomName] = useState("");

 const handleCreateRoom = async () => {
     try {
       const token = cookies.get('token');
       console.log(token)
       const decodedToken = getDecodedToken(token);
       console.log(decodedToken)
      
       const response = await apiClient.post('api/room/create', { name: roomName, creator: decodedToken.id, members: decodedToken.id },
         {
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
           }
         }
       );
       console.log("Room created:" , response.data)
       onRoomCreated(response.data); // Notify parent about the new room
       setRoomName("");
     } catch (error) {
       console.error("Error creating room:", error);
     }
     
   };
  return (
    <div className="flex flex-col justify-left gap-5 items-left p-4">
      <div>
      <h2 className="text-lg font-bold">Room Actions</h2>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="p-2 rounded bg-[#1d1528] text-white mt-2"
      />
      <button
        onClick={handleCreateRoom}
        className="p-2 bg-[#7dca9b] text-white rounded mt-2"
      >
        Create Room
      </button>
      </div>
      <div className="p-2">
      <h2 className="text-lg font-bold">Available Rooms</h2>
        <OpenRooms onJoinRoom={(room) => console.log("Joining room:", room)} />
      
      {/* Add Join Room and Invite Friends functionalities */}
    </div>
    </div>
  );
};

export default RoomActions;
