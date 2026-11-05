const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },

    name: {
      type: String,
      enum: [
        "Running",
        "Walking",
        "Cycling",
        "Swimming",
        "Yoga",
        "Weight Training",
        "HIIT",
        "Stretching"
      ],
      required: true
    },

    category: {
      type: String,
      enum: ["Cardio", "Strength", "Flexibility", "HIIT", "Yoga"],
      required: true
    },

    duration: {
      type: Number,
      min: 1,
      required: true
    },

    startTime: {
      type: Date,
      required: true
    },

    calories: {
      type: Number,
      min: 0,
      required: true
    },

    note: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
