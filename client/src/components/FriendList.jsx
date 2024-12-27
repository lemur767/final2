
import { useUser } from "@/contexts/UserContext";

const FriendList = ({ onFriendSelected }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <p>Loading friends...</p>;
  }

  if (!user || !user.friends.length) {
    return <p>No friends found.</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-bold">Friend List</h2>
      {user.friends.map((friend) => (
        <div
          key={friend._id}
          className="p-2 bg-[#1d1528] rounded mb-2 cursor-pointer hover:bg-[#7dca9b] hover:text-white"
          onClick={() => onFriendSelected(friend)}
        >
          {friend.username}
        </div>
      ))}
    </div>
  );
};

export default FriendList;

