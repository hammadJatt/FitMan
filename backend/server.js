const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());             
app.use(express.json());      
// Routes
app.use("/api/nutrition", require("./routes/nutrition"));
app.use("/api/workout", require("./routes/workout"));
app.use("/api/feedback", require("./routes/feedback")); 

// Root
app.get("/", (req, res) => res.send("Server running..."));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
