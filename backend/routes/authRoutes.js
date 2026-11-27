
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return jwt.sign(
    {
      id: user._id,
      userId: user.userId,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const formatUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  userId: user.userId,
  email: user.email,
  role: user.role,
});

router.post("/student/register", async (req, res) => {
  try {
    const { fullName, userId, email, password, confirmPassword } = req.body;

    if (!fullName || !userId || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
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
      return res.status(409).json({
        success: false,
        message: "User ID or Email already exists.",
      });
    }

    const student = await User.create({
      fullName: fullName.trim(),
      userId: normalizedUserId,
      email: normalizedEmail,
      password,
      role: "student",
    });

    const token = generateToken(student);

    return res.status(201).json({
      success: true,
      message: "Student registration successful.",
      token,
      user: formatUser(student),
    });
  } catch (error) {
    console.error("Student Registration Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to register student.",
    });
  }
});

router.post("/student/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: "User ID and password are required.",
      });
    }

    const student = await User.findOne({
      userId: userId.trim().toLowerCase(),
      role: "student",
    });

    if (!student || !(await student.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid User ID or Password.",
      });
    }

    const token = generateToken(student);

    return res.json({
      success: true,
      message: "Student login successful.",
      token,
      user: formatUser(student),
    });
  } catch (error) {
    console.error("Student Login Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to process student login.",
    });
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: "User ID and password are required.",
      });
    }

    const user = await User.findOne({
      userId: userId.trim().toLowerCase(),
      role: "admin",
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid Admin ID or Password.",
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: "Admin login successful.",
      token,
      user: formatUser(user),
    });
  } catch (error) {
    console.error("Admin Login Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to process admin login.",
    });
  }
});

module.exports = router;
