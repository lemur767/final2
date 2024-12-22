import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";

const RoomInvitations = () => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    socket.on('room_invitation', ({ roomId }) => {
      setInvitations((prev) => [...prev, roomId]);
    });

    return () => {
      socket.off('room_invitation');
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg">Room Invitations</h2>
      {invitations.map((roomId, index) => (
        <div key={index} className="p-2 bg-[#28223d] rounded mb-2">
          Room ID: {roomId}
        </div>
      ))}
    </div>
  );
};

export default RoomInvitations;
