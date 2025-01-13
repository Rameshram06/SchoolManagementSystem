import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const childrenData = [
  {
    id: 1,
    class: "10",
    rollNumber: "22",
    image:
      "https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-student-flat-portrait-of-man-png-image_14639684.png",
    name: "John Doe",
    fatherName: "Mr. Doe",
    motherName: "Mrs. Doe",
    dateofbirth: "10/08/2012",
    gender: "Male",
    section: "A",
    address: "1234 Elm Street, Some City",
    bloodGroup: "O+",
    feePaid: true,
    attendancePercentage: 95,
  },
  {
    id: 2,
    class: "9",
    rollNumber: "10",
    image:
      "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-women-cartoon-avatar-in-flat-style-png-image_6110776.png",
    name: "Jane Smith",
    fatherName: "Mr. Smith",
    motherName: "Mrs. Smith",
    dateofbirth: "25/03/2014",
    gender: "Female",
    section: "B",
    address: "5678 Oak Avenue, Other City",
    bloodGroup: "A+",
    feePaid: false,
    attendancePercentage: 88,
  },
];

const MyChild = () => {
  const { childId } = useParams(); // Fetch childId from the URL
  const [childData, setChildData] = useState(null);
  const navigate = useNavigate(); // Use navigate to go back to parent dashboard

  useEffect(() => {
    // Find the child based on the childId passed through the URL
    const foundChild = childrenData.find(
      (child) => child.id === parseInt(childId)
    );
    setChildData(foundChild || null); // Set child data or null if not found
  }, [childId]);

  const handleBack = () => {
    navigate("/dashboard"); // Navigate back to the parent dashboard
  };

  return (
    <div className="container-fluid p-0">
      {/* Sidebar and Content Layout */}
      <div className="row">
        {/* Main Content Area */}

        <div className="container my-4">
          {/* Back Button */}
          <div className="mb-3">
            <button
              className="btn btn-secondary"
              onClick={handleBack}
              style={{ borderRadius: 50 }}
            >
              <i className="bi bi-arrow-left-circle"></i> Back
            </button>
          </div>

          {/* Child Details */}
          {childData ? (
            <div>
              <h4>Child Details</h4>
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={childData.image}
                    alt="Child"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-md-8">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Name:</strong> {childData.name}
                    </li>
                    <li className="list-group-item">
                      <strong>Father Name:</strong> {childData.fatherName}
                    </li>
                    <li className="list-group-item">
                      <strong>Mother Name:</strong> {childData.motherName}
                    </li>
                    <li className="list-group-item">
                      <strong>Date of Birth:</strong> {childData.dateofbirth}
                    </li>
                    <li className="list-group-item">
                      <strong>Gender:</strong> {childData.gender}
                    </li>
                    <li className="list-group-item">
                      <strong>Class:</strong> {childData.class}{" "}
                      {childData.section}
                    </li>
                    <li className="list-group-item">
                      <strong>Roll Number:</strong> {childData.rollNumber}
                    </li>
                    <li className="list-group-item">
                      <strong>Address:</strong> {childData.address}
                    </li>
                    <li className="list-group-item">
                      <strong>Blood Group:</strong> {childData.bloodGroup}
                    </li>
                    <li className="list-group-item">
                      <strong>Fee Paid:</strong>{" "}
                      {childData.feePaid ? "Yes" : "No"}
                    </li>
                    <li className="list-group-item">
                      <strong>Attendance Percentage:</strong>{" "}
                      {childData.attendancePercentage}%
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div>No child data found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyChild;
