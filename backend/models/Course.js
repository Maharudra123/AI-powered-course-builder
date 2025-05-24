const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  targetAudience: String,
  estimatedDuration: Number,
  lessons: [
    {
      title: String,
      topics: [
        {
          title: String,
          content: String,
        },
      ],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
