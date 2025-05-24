import React, { useState } from "react";

const CourseViewer = ({ course }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  if (!course) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2> Welcome to AI Course Builder</h2>
        <p>Generate a course using the form above to get started!</p>
      </div>
    );
  }

  const currentLesson = course.lessons[currentLessonIndex];
  const currentTopic = currentLesson?.topics[currentTopicIndex];

  const getTotalTopics = () => {
    return course.lessons.reduce(
      (total, lesson) => total + lesson.topics.length,
      0
    );
  };

  const getCurrentTopicNumber = () => {
    let count = 0;
    for (let i = 0; i < currentLessonIndex; i++) {
      count += course.lessons[i].topics.length;
    }
    return count + currentTopicIndex + 1;
  };

  const goToNextTopic = () => {
    if (currentTopicIndex < currentLesson.topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
    } else if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setCurrentTopicIndex(0);
    }
  };

  const goToPreviousTopic = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
    } else if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setCurrentTopicIndex(
        course.lessons[currentLessonIndex - 1].topics.length - 1
      );
    }
  };

  const isFirstTopic = currentLessonIndex === 0 && currentTopicIndex === 0;
  const isLastTopic =
    currentLessonIndex === course.lessons.length - 1 &&
    currentTopicIndex === currentLesson.topics.length - 1;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* Course Header */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: "0 0 10px 0", color: "#333" }}>{course.title}</h1>
        <p style={{ margin: "0 0 10px 0", color: "#666" }}>
          {course.description}
        </p>
        <div style={{ fontSize: "14px", color: "#888" }}>
          <span> {course.targetAudience}</span> |
          <span> {course.estimatedDuration} minutes</span> |
          <span> {course.lessons.length} lessons</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>
            Topic {getCurrentTopicNumber()} of {getTotalTopics()}
          </span>
          <span style={{ fontSize: "14px", color: "#666" }}>
            Lesson {currentLessonIndex + 1}: {currentLesson.title}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              width: `${(getCurrentTopicNumber() / getTotalTopics()) * 100}%`,
              height: "100%",
              backgroundColor: "#007bff",
              borderRadius: "4px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Current Topic Content */}
      <div
        style={{
          backgroundColor: "white",
          border: "2px solid #e0e0e0",
          borderRadius: "10px",
          padding: "30px",
          marginBottom: "20px",
          minHeight: "400px",
        }}
      >
        <h2
          style={{
            color: "#007bff",
            borderBottom: "2px solid #e0e0e0",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          {currentTopic.title}
        </h2>

        <div
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#333",
            whiteSpace: "pre-line",
          }}
        >
          {currentTopic.content}
        </div>
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={goToPreviousTopic}
          disabled={isFirstTopic}
          style={{
            padding: "10px 20px",
            backgroundColor: isFirstTopic ? "#ccc" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isFirstTopic ? "not-allowed" : "pointer",
          }}
        >
          ← Previous
        </button>

        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          New Course
        </button>

        <button
          onClick={goToNextTopic}
          disabled={isLastTopic}
          style={{
            padding: "10px 20px",
            backgroundColor: isLastTopic ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isLastTopic ? "not-allowed" : "pointer",
          }}
        >
          Next →
        </button>
      </div>

      {isLastTopic && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3> Congratulations!</h3>
          <p>You've completed the entire course!</p>
        </div>
      )}
    </div>
  );
};

export default CourseViewer;
