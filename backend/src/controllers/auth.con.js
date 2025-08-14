import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { QueueEvents } from "bullmq";

import ImageQueue from "../jobs/queues/ImageQueue.js";
import redis from "../configs/redisConnect.js";

const imageQueueEvents = new QueueEvents("imageQueue", { connection: redis });

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    if (!email.trim() || !password.trim() || !fullName.trim()) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "User already existed" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    //create new user
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const splitFileName = req.file?.originalname.split(".")[0];
    const fileName = `${splitFileName}-${Date.now()}.webp`;

    const job = await ImageQueue.add(
      "optimize-imageToCloud",
      {
        fileName,
        width: 200,
        height: 200,
        quality: 50,
        buffer: req.file.buffer,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      }
    );

    const result = await job.waitUntilFinished(imageQueueEvents);

    const user = await User.create({
      name: fullName,
      email,
      profileImageUrl: result?.secure_url,
      password: hashedpassword,
    });
    //return user
    const cookieToken = generateToken(user._id);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set true in production
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    return res
      .cookie("token", cookieToken, cookieOptions)
      .status(201)
      .json({
        isSuccess: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profileImageUrl: user.profileImageUrl,
        },
      });
  } catch (error) {
    return {
      error: error.response?.data?.message || "Login Failed!",
    };
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existedUser = await User.findOne({ email });

    if (!existedUser) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const matchPwd = await bcrypt.compare(password, existedUser.password);
    if (!matchPwd) {
      return res.status(400).json({
        message: "Invalid credentails login",
      });
    }
    const cookieToken = generateToken(existedUser._id);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set true in production
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    return res.cookie("token", cookieToken, cookieOptions).status(201).json({
      id: existedUser._id,
      name: existedUser.name,
      email: existedUser.email,
      profileImageUrl: existedUser.profileImageUrl,
      message: "Successfully login",
      isSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const existedUser = await User.findById(req.user._id).select("-password");
    if (!existedUser) {
      res.status(400).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ user: existedUser });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  const userId = req.user._id;
  const existedUser = await User.findById(userId).select("-password");
  if (!existedUser) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logged out" });
};
