/* eslint-disable react/prop-types */
import {socket} from '@/utils/socket';
import { useEffect, useState } from 'react';


const ChatContainer = ({ messages, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(messages || []);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Listen for typing events
    socket.on('typing', ({ senderId }) => {
      setIsTyping(true);
    });

    socket.on('stop_typing', ({ senderId }) => {
      setIsTyping(false);
    });

    return () => {
      socket.off('typing');
      socket.off('stop_typing');
    };
  }, []);

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!isTyping) {
      socket.emit('typing', {
        senderId: localStorage.getItem('userId'),
        receiverId: "receiverUserId", // Replace with actual receiver ID
      });
    }

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit('stop_typing', {
        senderId: localStorage.getItem('userId'),
        receiverId: "receiverUserId",
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full p-4 bg-[#1d1528] text-[#7dca9b]">
      {/* Messages */}
      <div className="flex-grow overflow-y-auto mb-4">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md mb-2 ${
              msg.isSender ? "bg-[#7dca9b] text-white self-end" : "bg-[#a816ec] text-white self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isTyping && (
          <div className="text-sm text-gray-500 italic">User is typing...</div>
        )}
      </div>

      {/* Message Input */}
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow p-2 rounded-l-md bg-[#28223d] text-white"
          value={message}
          onChange={handleTyping}
        />
        <button
          className="p-2 bg-[#7dca9b] text-white rounded-r-md"
          onClick={() => {
            onSendMessage(message);
            setMessage(""); // Clear input
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
