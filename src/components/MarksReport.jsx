import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [activeStudent, setActiveStudent] = useState(null);
  const [activeReport, setActiveReport] = useState(null);

  const studentsData = [
    {
      roleNumber: "101",
      class: "10",
      name: "John Doe",
      marks: {
        Maths: 25,
        Science: 22,
        English: 19,
        History: 24,
        Geography: 23,
      },
      quarterlyMarks: {
        Maths: 45,
        Science: 42,
        English: 39,
        History: 44,
        Geography: 43,
      },
      annualMarks: {
        Maths: 85,
        Science: 90,
        English: 88,
        History: 78,
        Geography: 92,
      },
    },
    {
      roleNumber: "102",
      class: "10",
      name: "Jane Smith",
      marks: {
        Maths: 20,
        Science: 18,
        English: 22,
        History: 19,
        Geography: 24,
      },
      quarterlyMarks: {
        Maths: 40,
        Science: 38,
        English: 35,
        History: 42,
        Geography: 41,
      },
      annualMarks: {
        Maths: 75,
        Science: 80,
        English: 78,
        History: 70,
        Geography: 85,
      },
    },
  ];

  const handleStudentClick = (student) => {
    setActiveStudent(student);
    setActiveReport(null);
  };

  const calculateTotalAndPercentage = (marks, maxMarks) => {
    const totalMarks = Object.values(marks).reduce(
      (sum, mark) => sum + mark,
      0
    );
    const totalPossibleMarks = Object.keys(marks).length * maxMarks;
    const percentage = ((totalMarks / totalPossibleMarks) * 100).toFixed(2);
    return { totalMarks, totalPossibleMarks, percentage };
  };

  const renderReportTable = () => {
    if (!activeReport || !activeStudent) return null;

    const reports = {
      monthly: { data: activeStudent.marks, max: 25 },
      quarterly: { data: activeStudent.quarterlyMarks, max: 50 },
      annual: { data: activeStudent.annualMarks, max: 100 },
    };

    const report = reports[activeReport];
    const { totalMarks, totalPossibleMarks, percentage } =
      calculateTotalAndPercentage(report.data, report.max);

    return (
      <div className="text-center" style={{ backgroundColor: "aliceblue" }}>
        <h3>
          {activeStudent.name}{" "}
          {activeReport.charAt(0).toUpperCase() + activeReport.slice(1)} Reports
        </h3>
        <h4>Class: {activeStudent.class}</h4>

        <div
          id="order-listing_wrapper"
          className="dataTables_wrapper dt-bootstrap5 no-footer"
          style={{ overflowY: "auto", maxHeight: "400px" }}
        >
          <table
            id="order-listing"
            className="table dataTable no-footer"
            aria-describedby="order-listing_info"
          >
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(report.data).map(([subject, marks]) => (
                <tr key={subject}>
                  <td>{subject}</td>
                  <td>
                    {marks} / {report.max}
                  </td>
                  <td>{marks < report.max * 0.4 ? "Fail" : "Pass"}</td>
                </tr>
              ))}
              <tr style={{ backgroundColor: "#f9f9f9", fontWeight: "bold" }}>
                <td>Total Marks</td>
                <td colSpan="2">
                  {totalMarks} / {totalPossibleMarks}
                </td>
              </tr>
              <tr style={{ backgroundColor: "#f9f9f9", fontWeight: "bold" }}>
                <td>Overall Percentage</td>
                <td colSpan="2">{percentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ fontFamily: "sans-serif", backgroundColor: "aliceblue" }}
    >
      <style>
        {`
        .btn {
          border-radius: 50px !important;
          background-color: RGB(75,72,172) !important;
        }
        .btn:hover {
          background-color: RGB(75,72,172) !important;
        }
        `}
      </style>

      {/* Marks Report Heading */}
      <h2 className="my-5">Marks Report</h2>

      {/* Student Buttons */}
      <div className="d-flex justify-content-center mb-3">
        {studentsData.map((student) => (
          <button
            key={student.roleNumber}
            className="btn btn-primary mx-2"
            onClick={() => handleStudentClick(student)}
          >
            {student.name}
          </button>
        ))}
      </div>

      {/* Report Selection Buttons */}
      {activeStudent && (
        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn btn-primary mx-2"
            onClick={() => setActiveReport("monthly")}
          >
            Monthly Reports
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={() => setActiveReport("quarterly")}
          >
            Quarterly Reports
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={() => setActiveReport("annual")}
          >
            Annual Reports
          </button>
        </div>
      )}

      {/* Render Report Table */}
      {renderReportTable()}
    </div>
  );
};

export default App;
