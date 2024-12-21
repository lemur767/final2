
import { useState } from 'react';
import {IoArrowBack} from 'react-icons/io5';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';




const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const saveChanges = async () => {

  };

  return (
    <div className="bg-[#1d1528] h-[100vh] flex gap-10 flex-col items-center justify-center">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-4xl lg:text6xl text-[#7dca9b]/90 cursor-pointer"/>

        
        <div className="grid grid-cols-2">
          <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">

              {imageURL ? (<AvatarImage src={imageURL} alt="User avatar" className="object-cover w-full h-full bg-black"/>) : (<div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl bg-[#a816ec] border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}> 
                  {firstName ? firstName.split(" ").shift() : userInfo.split(" ").shift()}
                </div>
              )}
            </Avatar>
            {hovered && <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-[#a816ec]-50">{imageURL ? <FaTrash className="text-[#7dca9b] text-3xl cursor-pointer" /> : <FaPlus className="text-[#7dca9b] text-3xl cursor-pointer" />}</div>}

        </div>
        <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
          <div className="w-full">
            <Input placeholder ="Email" type="email" value={userInfo.email} disabled className="rounded-lg p-6 bg-[#1d1528] border-none " />
            <Input placeholder ="First Name" type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} disabled className="rounded-lg p-6 bg-[#1d1528] border-none " />
            <Input placeholder ="Last Name" type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} disabled className="rounded-lg p-6 bg-[#1d1528] border-none " />
          </div>
          <div className="w-full flex gap-5">
            {colors.map((color, index) => (
               <div 
               className={`${color} h-8 w-8 rounded-full cursor-pointer duration-300 transition-all
              ${
                selectedColor === index ? "outline outline-white/50 outline-1" : "" 

              }}
                `}
              key={index}
              onClick={() => setSelectedColor(index)}>

              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}
export default Profile