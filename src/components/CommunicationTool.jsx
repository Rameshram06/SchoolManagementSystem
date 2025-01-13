import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CommunicationTool = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [parentName, setParentName] = useState("");

  const navigate = useNavigate(); // For navigation

  // Sample data for classes and subjects
  const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const subjects = [
    "Math",
    "Science",
    "English",
    "Social",
    "Hindi",
    "Kannada",
    "Sanskrit",
  ];

  // Retrieve parent name from localStorage when the component mounts
  useEffect(() => {
    const storedParentName = localStorage.getItem("parentName");
    if (storedParentName) {
      setParentName(storedParentName);
    }
  }, []);

  const handleGoToMessages = () => {
    if (selectedClass && selectedSubject) {
      // Navigates to the Messages Dashboard page with class and subject
      navigate(`/messages-dashboard/${selectedClass}/${selectedSubject}`);
    } else {
      alert("Please select both class and subject.");
    }
  };
  const buttonStyle = {
    backgroundColor: "rgb(75, 73, 172)",
    color: "white",
    padding: "6px 12px",
    fontSize: "0.8rem",
    borderRadius: "50px", // Set a large border-radius for pill shape
    border: "none",
    cursor: "pointer",
    fontWeight: "normal",
    marginRight: "6px",
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        padding: "20px",
        paddingLeft: "50px",
        paddingRight: "20px",
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <h4 className="text-center mb-4">
          Welcome {parentName ? parentName : "Parent"}
        </h4>
        <p className="text-center mb-4">
          Select class and subject to start communicating with teachers.
        </p>

        {/* Select Class */}
        <div className="mb-4">
          <label htmlFor="classSelect" className="form-label">
            Choose Class:
          </label>
          <select
            id="classSelect"
            className="form-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                Class {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Select Subject */}
        {selectedClass && (
          <div className="mb-4">
            <label htmlFor="subjectSelect" className="form-label">
              Select Subject:
            </label>
            <select
              id="subjectSelect"
              className="form-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Go to Messages Button */}
        {selectedSubject && (
          <div className="text-center">
            <button
              onClick={handleGoToMessages}
              className="btn btn-primary btn-lg"
              style={buttonStyle}
            >
              Go to Messages
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationTool;
