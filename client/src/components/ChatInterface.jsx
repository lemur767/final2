import { useState } from "react";
import ChatRoomForm  from "./ChatRoomForm";
import InviteUsers from "./InviteUsers";
import RoomInvitations from "./RoomInvitations";
import ChatContainer from "./ChatContainer";

const ChatInterface = () => {
  const [rooms, setRooms] = useState([]); // Stores available chat rooms
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomCreated = (room) => {
    setRooms((prevRooms) => [...prevRooms, room]);
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="flex h-screen">
      {/* Left panel: Room management */}
      <div className="w-1/3 bg-[#28223d] text-[#7dca9b]">
        <ChatRoomForm onRoomCreated={handleRoomCreated} />
        <RoomInvitations />
        {rooms.map((room) => (
          <div
            key={room._id}
            className="p-2 cursor-pointer hover:bg-[#7dca9b] hover:text-white"
            onClick={() => handleSelectRoom(room)}
          >
            {room.name}
          </div>
        ))}
      </div>

      {/* Right panel: Chat container */}
      <div className="w-2/3 bg-[#1d1528]">
        {selectedRoom ? (
          <ChatContainer room={selectedRoom} />
        ) : (
          <div className="flex items-center justify-center h-full text-[#7dca9b]">
            Select a room to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;


