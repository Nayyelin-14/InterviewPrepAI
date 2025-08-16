import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./Cards/ProfileCard";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 drop-shadow-md"
        >
          PrepWise
        </Link>

        {/* Right Side */}
        <div className="flex items-center">
          <ProfileCard />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
