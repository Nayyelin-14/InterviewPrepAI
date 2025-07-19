import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

const DashBoardLayout = ({ children }) => {
  const { user, loading, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); // ✅ Proper redirect
    }
  }, [loading, user, navigate]);

  if (loading) return <div>Loading user data...</div>;
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DashBoardLayout;
