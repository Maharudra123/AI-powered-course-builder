const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const courseRoutes = require("./routes/courses");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/coursebuilder")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Error:", err));

// Routes
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.json({ message: "AI Course Builder API is running!" });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
