const express = require("express");
const router = express.Router();
const Nutrition = require("../models/Nutrition");

// Create
router.post("/", async (req, res) => {
    try {
        const nutrition = await Nutrition.create(req.body);
        res.status(201).json(nutrition);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get All for user
router.get("/:userId", async (req, res) => {
    try {
        const entries = await Nutrition.find({ user: req.params.userId }).sort({ date: -1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update
router.put("/:id", async (req, res) => {
    try {
        const nutrition = await Nutrition.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(nutrition);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
        await Nutrition.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
