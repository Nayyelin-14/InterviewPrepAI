import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./Cards/ProfileCard";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-black">
          Interview Prep AI
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
