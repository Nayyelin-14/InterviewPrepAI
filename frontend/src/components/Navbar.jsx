import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./Cards/ProfileCard";

const Navbar = () => {
  return (
    <div className="h-20 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-3 px-4 md:px-0 sticky top-0 z-30 ">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link
          to="/dashboard"
          className="text-lg md:text-xl font-medium text-black leading-5"
        >
          <h2>Interview Prep AI</h2>
        </Link>
        <ProfileCard />
      </div>
    </div>
  );
};

export default Navbar;
