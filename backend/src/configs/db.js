import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.log(error, "Error connecting to database");
    process.exit(1);
  }
};

export default connectDB;
