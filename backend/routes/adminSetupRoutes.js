
const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const setupKey = process.env.ADMIN_SETUP_KEY;

    if (!setupKey) {
      return res.status(500).json({
        success: false,
        message: "Admin setup is not configured.",
      });
    }

    const providedKey = req.headers["x-admin-setup-key"];

    if (providedKey !== setupKey) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin account already exists.",
      });
    }

    const { fullName, userId, email, password } = req.body;

    if (!fullName || !userId || !email || !password) {
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

    const admin = await User.create({
      fullName: fullName.trim(),
      userId: normalizedUserId,
      email: normalizedEmail,
      password,
      role: "admin",
    });

    return res.status(201).json({
      success: true,
      message: "Admin account created successfully.",
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        userId: admin.userId,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin Setup Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create admin account.",
    });
  }
});

module.exports = router;
