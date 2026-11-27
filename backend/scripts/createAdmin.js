
require("dotenv").config();

const readline = require("readline");
const connectDB = require("./config/db");
const User = require("./models/User");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

const createAdmin = async () => {
  try {
    await connectDB();

    const fullName = await ask("Admin Name: ");
    const userId = await ask("Admin User ID: ");
    const email = await ask("Admin Email: ");
    const password = await ask("Admin Password: ");

    if (!fullName || !userId || !email || !password) {
      console.log("All fields are required.");
      return;
    }

    if (password.length < 8) {
      console.log("Password must be at least 8 characters.");
      return;
    }

    const normalizedUserId = userId.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      $or: [
        { userId: normalizedUserId },
        { email: normalizedEmail },
      ],
    });

    if (existingUser) {
      console.log("This User ID or Email already exists.");
      return;
    }

    await User.create({
      fullName: fullName.trim(),
      userId: normalizedUserId,
      email: normalizedEmail,
      password,
      role: "admin",
    });

    console.log("Admin account created successfully!");
  } catch (error) {
    console.error("Admin creation failed:", error.message);
  } finally {
    rl.close();
    process.exit();
  }
};

createAdmin();
