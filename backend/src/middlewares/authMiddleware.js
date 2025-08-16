import User from "../models/Users.js";

import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies ? req.cookies.token : null;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Not an  authenticated user" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        message: "Not an  authenticated user",
        error: error.message,
      });
    }

    if (!decoded.id) {
      return res.status(401).json({
        message: "Not an  authenticated user",
      });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Not an  authenticated user",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not an valid token", error: error.message });
  }
};

export const authCheck = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(401).json({ message: "Not an  authenticated user" });
  }
  return res.status(200).json({
    message: "You are authenticated.",
    user,
  });
};
