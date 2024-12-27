
   
    import { useState } from "react";
    import {useNavigate} from 'react-router-dom';
    import RoomActions from "./RoomActions";
    import FriendList from "./FriendList";
    import RoomInvitations from "./RoomInvitations";
  
    import { useUser } from "@/contexts/UserContext";


    
    const Sidebar = () => {
      const {user, updateUser} = useUser();
      const [activeSection, setActiveSection] = useState("rooms"); // Default section
      const navigate = useNavigate();
      const renderActiveSection = () => {
        switch (activeSection) {
          case "rooms":
            return <RoomActions />;
          case "friends":
            return <FriendList />;
          case "invitations":
            return <RoomInvitations />;
        
          default:
            return <RoomActions />;
        }
      };
    
      return (
        <div className="flex w-[25vw] flex-col p-4 gap-1 bg-[#28223d] text-[#7dca9b] h-full">
          {/* Sidebar Menu */}
          <div className="p-4 border-b border-[#ab16ec]">
            <div className="flex flex-row p-2 justify-center gap-10 items-center">
              <img src="logo_small.png" alt="logo" width='50px' height='50px'></img>
            <h2 className="text-xl font-bold">Looking For Facts</h2>
            </div>
            <ul className="mt-4">
              <li
                className={`cursor-pointer p-2 hover:bg-[#7dca9b] hover:text-[#ab16ec] ${
                  activeSection === "rooms" ? "bg-[#1d1528] text-[#7dca96]" : ""
                }`}
                onClick={() => setActiveSection("rooms")}
              >
                Rooms
              </li>
              <li
                className={`cursor-pointer p-2 hover:bg-[#7dca9b] hover:text-[#ab16ec] ${
                  activeSection === "friends" ? "bg-[#1d1528] text-[#7dca96]" : ""
                }`}
                onClick={() => setActiveSection("friends")}
              >
                Friends
              </li>
              <li
                className={`cursor-pointer p-2 hover:bg-[#7dca9b] hover:text-[#ab16ec] ${
                  activeSection === "invitations" ? "bg-[#1d1528] text-white" : ""
                }`}
                onClick={() => setActiveSection("invitations")}
              >
                Invitations
              </li>
         
            </ul>
          </div>
    
          {/* Active Section Content */}
          <div className="flex-grow overflow-y-auto p-4">{renderActiveSection()}
          </div>
        
          <div
        className="flex items-center p-4 bg-[#1d1528] border-t border-[#7dca9b] cursor-pointer hover:bg-[#7dca9b] hover:text-white"
        onClick={() => navigate("/profile")}
      >
        <img
          src={user?.imageURL || "https://via.placeholder.com/40"}
          alt={`${user?.firstName} ${user?.lastName}`}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <p className="font-bold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>
        </div>
      );
    };
    
  export default Sidebar;
    
