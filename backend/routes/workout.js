const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// Create
router.post("/", async (req, res) => {
    try {
        const workout = await Workout.create(req.body);
        res.status(201).json(workout);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get All for user
router.get("/:userId", async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.params.userId }).sort({ date: -1 });
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update
router.put("/:id", async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(workout);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
