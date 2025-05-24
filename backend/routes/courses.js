const express = require("express");
const Course = require("../models/Course");
const aiService = require("../services/aiService");

const router = express.Router();

// Generate and create course
router.post("/generate", async (req, res) => {
  try {
    const { topic, duration } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    console.log(` Generating course for: ${topic}`);

    // Generate course using AI
    const courseData = await aiService.generateCourse(topic, duration);

    // Save to database
    const course = new Course(courseData);
    await course.save();

    console.log(` Course created: ${courseData.title}`);
    res.json(course);
  } catch (error) {
    console.error("Error generating course:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific course
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
