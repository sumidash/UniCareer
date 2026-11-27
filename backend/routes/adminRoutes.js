const Skill = require("../models/Skill");
const Career = require("../models/Career");
const express = require("express");
const User = require("../models/User");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/students", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalStudents: students.length,
      students,
    });
  } catch (error) {
    console.error("Fetch Students Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch students.",
    });
  }
});



router.get("/careers", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalCareers: careers.length,
      careers,
    });
  } catch (error) {
    console.error("Fetch Careers Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch careers.",
    });
  }
});

router.post("/careers", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      requiredSkills,
      averageSalary,
      demand,
    } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, category and description are required.",
      });
    }

    const career = await Career.create({
      title,
      category,
      description,
      requiredSkills,
      averageSalary,
      demand,
    });

    return res.status(201).json({
      success: true,
      message: "Career created successfully.",
      career,
    });
  } catch (error) {
    console.error("Create Career Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create career.",
    });
  }
});

router.get("/skills", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalSkills: skills.length,
      skills,
    });
  } catch (error) {
    console.error("Fetch Skills Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch skills.",
    });
  }
});

router.post("/skills", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, category, description } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Skill name and category are required.",
      });
    }

    const skill = await Skill.create({
      name,
      category,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Skill created successfully.",
      skill,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This skill already exists.",
      });
    }

    console.error("Create Skill Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create skill.",
    });
  }
});



module.exports = router;
