
const mongoose = require("mongoose");
const readline = require("readline");
require("dotenv").config();

const User = require("../models/User");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!");

    const fullName = await ask("Admin Full Name: ");
    const userId = await ask("Admin User ID: ");
    const email = await ask("Admin Email: ");
    const password = await ask("Admin Password (minimum 8 characters): ");

    if (!fullName.trim() || !userId.trim() || !email.trim() || password.length < 8) {
      throw new Error("Please provide valid details. Password must be at least 8 characters.");
    }

    const existingUser = await User.findOne({
      $or: [
        { userId: userId.trim().toLowerCase() },
        { email: email.trim().toLowerCase() },
      ],
    });

    if (existingUser) {
      throw new Error("This User ID or Email already exists.");
    }

    const admin = await User.create({
      fullName: fullName.trim(),
      userId: userId.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password,
      role: "admin",
    });

    console.log("Admin account created successfully!");
    console.log("Admin User ID:", admin.userId);
  } catch (error) {
    console.error("Admin Creation Error:", error.message);
  } finally {
    rl.close();
    await mongoose.disconnect();
  }
};

createAdmin();
