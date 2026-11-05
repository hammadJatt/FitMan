const mongoose = require("mongoose");

const NutritionSchema = new mongoose.Schema({
    user: { type: String, required: true }, // Clerk user ID
    mealType: { type: String, required: true },
    foodItems: [{ name: String, quantity: String, calories: Number }],
    totalCalories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Nutrition", NutritionSchema);
