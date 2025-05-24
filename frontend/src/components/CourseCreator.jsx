import React, { useState, useEffect } from "react";
import { courseAPI } from "../services/api";

const CourseCreator = ({ onCourseGenerated }) => {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Initialize speech recognition
    if (window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTopic(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setError("Speech recognition failed. Please try again.");
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
      setError("");
    } else {
      setError("Speech recognition is not supported in your browser.");
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError("Please enter a course topic");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      console.log(" Generating course:", topic);
      const response = await courseAPI.generateCourse(topic, duration);
      console.log(" Course generated:", response.data);

      onCourseGenerated(response.data);
      setTopic("");
    } catch (error) {
      console.error(" Generation failed:", error);
      setError(error.response?.data?.error || "Failed to generate course");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2> AI Course Builder</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Course Topic:
          </label>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., JavaScript Basics, Digital Marketing, Python for Beginners"
              style={{
                flex: 1,
                padding: "10px",
                border: "2px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
              disabled={isGenerating || isListening}
            />
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              style={{
                padding: "10px",
                backgroundColor: isListening ? "#ff4444" : "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "40px",
                height: "40px",
              }}
              disabled={isGenerating}
            >
              {isListening ? "⏹️" : "mic"}
            </button>
          </div>
          {isListening && (
            <div
              style={{
                marginTop: "10px",
                padding: "8px",
                backgroundColor: "#e8f5e9",
                borderRadius: "4px",
                color: "#2e7d32",
                textAlign: "center",
              }}
            >
              Listening... Speak now
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Duration (minutes):
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
            }}
            disabled={isGenerating}
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: isGenerating ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: isGenerating ? "not-allowed" : "pointer",
          }}
        >
          {isGenerating ? " Generating Course..." : " Generate Course"}
        </button>
      </form>

      {error && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffe6e6",
            border: "1px solid #ff9999",
            borderRadius: "5px",
            color: "#cc0000",
          }}
        >
          ❌ {error}
        </div>
      )}

      {isGenerating && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#e6f3ff",
            border: "1px solid #99ccff",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <p>AI is creating your course...</p>
          <p>This may take 10-30 seconds</p>
        </div>
      )}
    </div>
  );
};

export default CourseCreator;
