import { useState } from "react";
import ChatContainer from "./ChatContainer";
import Sidebar from "./Sidebar";

const ChatInterface = () => {
  const [rooms, setRooms] = useState([]); // Stores available chat rooms
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomCreated = (rooms) => {
    setRooms((prevRooms) => [...prevRooms, rooms]);
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="flex h-screen">
      {/* Left panel: Sidebar */}
      <div className="w-fit bg-[#28223d] text-[#7dca9b]">
        <Sidebar 
          onRoomCreated={handleRoomCreated} 
          rooms={rooms} 
          onSelectRoom={handleSelectRoom}
          room={selectedRoom} 
        />       
      </div>

      {/* Right panel: Chat container */}
      <div className="w-[75vw] overflow-x-hidden bg-[#1d1528]">
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


