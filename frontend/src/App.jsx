import React, { useState } from "react";
import CourseCreator from "./components/CourseCreator";
import CourseViewer from "./components/CourseViewer";
import "./App.css";

function App() {
  const [currentCourse, setCurrentCourse] = useState(null);

  const handleCourseGenerated = (course) => {
    setCurrentCourse(course);
  };

  return (
    <div className="App">
      {!currentCourse ? (
        <CourseCreator onCourseGenerated={handleCourseGenerated} />
      ) : (
        <CourseViewer course={currentCourse} />
      )}
    </div>
  );
}

export default App;
