/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { socket } from "@/utils/socket"; // Import your Socket.IO instance
import ChatRoomForm  from "@/components/ChatRoomForm";
import InviteUsers from "@/components/InviteUsers";

const ContactsContainer = ({ onSelectContact }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Listen for the 'online_users' event from the backend
    socket.on('online_users', (users) => {
      setOnlineUsers(users);
    });

    // Emit the current user's ID to mark them online
    socket.emit('user_online', localStorage.getItem('userId')); // Replace with actual userId

    return () => {
      socket.off('online_users'); // Clean up the event listener on unmount
    };
  }, []);

  return (
    <div className="w-1/3 bg-[#28223d] text-[#7dca9b] p-4 overflow-y-auto">
      <h2 className="text-xl mb-4 font-bold">Online Users</h2>
      {onlineUsers.length > 0 ? (
        onlineUsers.map((userId, index) => (
          <div
            key={index}
            className="p-2 mb-2 rounded-md cursor-pointer bg-[#1d1528] hover:bg-[#7dca9b] hover:text-white"
            onClick={() => onSelectContact(userId)}
          >
            User {localStorage.getItem('user')} {/* Replace with actual user details if available */}
          </div>
        ))
      ) : (
        <p>No users online</p>
      )}
      <div className="flex flex-row flex-grow-0 justify-start items-center text-[#7dca9b] round-md cursor-pointer hover:bg-[#7dca9b] hover:text-white">
        <>
        <ChatRoomForm />
        <InviteUsers/>
        </>
      </div>
    </div>
  );
};

export default ContactsContainer;
