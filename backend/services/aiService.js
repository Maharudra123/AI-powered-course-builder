const { GoogleGenerativeAI } = require("@google/generative-ai");

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  async generateCourse(topic, duration = 30) {
    const prompt = `
Create a complete course structure for: "${topic}"
Duration: ${duration} minutes

Return ONLY valid JSON in this exact format:
{
  "title": "Course Title",
  "description": "Brief description",
  "targetAudience": "Who this is for",
  "estimatedDuration": ${duration},
  "lessons": [
    {
      "title": "Lesson 1 Title",
      "topics": [
        {
          "title": "Topic 1",
          "content": "Educational content here (200-300 words)"
        },
        {
          "title": "Topic 2", 
          "content": "Educational content here (200-300 words)"
        }
      ]
    }
  ]
}

Create 3-4 lessons with 2-3 topics each. Make content educational and engaging.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const text = result.response.text().trim();

      // Clean the response to extract JSON
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}") + 1;
      const jsonStr = text.slice(jsonStart, jsonEnd);

      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("AI Generation Error:", error);
      throw new Error("Failed to generate course content");
    }
  }
}

module.exports = new AIService();
