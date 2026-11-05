const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// Create feedback
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message, rating } = req.body;
    const feedback = new Feedback({ name, email, subject, message, rating });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
});

// Get all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
});

module.exports = router;
