import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronDown } from "lucide-react";

const ProfileCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button (Name + Avatar + Dropdown Icon) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-200/30 dark:hover:bg-slate-700/40 transition-colors duration-200"
      >
        {/* Avatar */}
        <img
          src={user?.profileImageUrl}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
        />
        {/* Name */}
        <span className="font-medium text-sm sm:text-base truncate max-w-[100px]">
          {user?.name}
        </span>
        {/* Dropdown Icon */}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-43 sm:w-56  origin-top-right bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-20">
          <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-slate-700 truncate">
            {user?.email}
          </div>
          {/* Logout (responsive: icon only on mobile) */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
