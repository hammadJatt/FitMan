const mongoose = require("mongoose");
require("dotenv").config();

const Nutrition = require("./models/Nutrition");
const Workout = require("./models/Workout");

const USER_ID = "user_36mrvB5FEJOv8fPtpG9PJcBvYX7";

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await Nutrition.deleteMany({ user: USER_ID });
    await Workout.deleteMany({ user: USER_ID });

    await Nutrition.insertMany([
      {
        user: USER_ID,
        mealType: "Breakfast",
        foodItems: [
          { name: "Eggs", quantity: "2", calories: 140 },
        ],
        totalCalories: 140,
      },
    ]);

    await Workout.insertMany([
      {
        user: USER_ID,
        category: "Cardio",
        name: "Running",
        duration: 30,
        caloriesBurned: 250,
      },
    ]);

    console.log("Sample data inserted");
    mongoose.disconnect();
  })
  .catch(console.error);
