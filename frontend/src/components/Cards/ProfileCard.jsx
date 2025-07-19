import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    clearUser();
    navigate("/");
  };
  return (
    <div className="flex items-center ">
      <img
        src={user?.profileImageUrl}
        alt="Profile_image"
        aria-hidden
        className="w-11 h-11 rounded-full mr-3 bg-white border border-gray-500 p-1"
      />
      <div>
        <div className="text-amber-500 text-sm font-semibold cursor-pointer">
          {user?.name}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-bold text-red-600 cursor-pointer hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
