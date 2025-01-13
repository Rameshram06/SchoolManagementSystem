import React, { useState } from "react";

const TimeTable = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedExamType, setSelectedExamType] = useState(null);
  const [showJohnDoe, setShowJohnDoe] = useState(true);
  const [showJaneSmith, setShowJaneSmith] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);

  const studentTimeTables = {
    "John Doe": {
      classTimeTable: {
        Monday: [
          "Math (Mr. A)",
          "English (Ms. B)",
          "Science (Mr. C)",
          "Lunch Break",
          "History (Ms. D)",
          "Computer (Mr. K)",
          "Biology (Mr. H)",
          "Chemistry (Ms. G)",
        ],
        Tuesday: [
          "Physics (Mr. F)",
          "Chemistry (Ms. G)",
          "Biology (Mr. H)",
          "Lunch Break",
          "Geography (Ms. I)",
          "Art (Mr. J)",
          "History (Ms. D)",
          "English (Ms. B)",
        ],
        Wednesday: [
          "Math (Mr. A)",
          "English (Ms. B)",
          "Computer (Mr. K)",
          "Lunch Break",
          "History (Ms. D)",
          "Music (Ms. L)",
          "Science (Mr. C)",
          "Math (Mr. A)",
        ],
        Thursday: [
          "Physics (Mr. F)",
          "Chemistry (Ms. G)",
          "Biology (Mr. H)",
          "Lunch Break",
          "Geography (Ms. I)",
          "PE (Mr. E)",
          "Computer (Mr. K)",
          "Science (Mr. C)",
        ],
        Friday: [
          "Math (Mr. A)",
          "English (Ms. B)",
          "Science (Mr. C)",
          "Lunch Break",
          "History (Ms. D)",
          "Art (Mr. J)",
          "History (Ms. D)",
          "Math (Mr. A)",
        ],
        Saturday: [
          "Physics (Mr. F)",
          "Chemistry (Ms. G)",
          "Biology (Mr. H)",
          "Lunch Break",
          "-",
          "-",
          "-",
          "-",
        ],
      },
      examTimeTables: {
        Monthly: {
          Monday: {
            date: "5/01/2025", // Date for Mathematics exam
            subject: "Math",
          },
          Tuesday: {
            date: "16/01/2025", // Date for English exam
            subject: "English",
          },
          Wednesday: {
            date: "17/01/2025", // Date for Science exam
            subject: "Science",
          },
          Thursday: {
            date: "18/01/2025", // Date for History exam
            subject: "History",
          },
        },
        MidTerm: {
          Monday: {
            date: "10/03/2025", // Date for Physics exam
            subject: "Physics",
          },
          Tuesday: {
            date: "11/03/2025", // Date for Science exam
            subject: "Science",
          },
          Wednesday: {
            date: "12/03/2025", // Date for History exam
            subject: "History",
          },
          Thursday: {
            date: "13/03/2025", // Date for Biology exam
            subject: "Biology",
          },
        },
        Annual: {
          Monday: {
            date: "10/06/2025", // Date for Physics exam
            subject: "Physics",
          },
          Tuesday: {
            date: "11/06/2025", // Date for Science exam
            subject: "Science",
          },
          Wednesday: {
            date: "12/06/2025", // Date for History exam
            subject: "History",
          },
          Thursday: {
            date: "13/06/2025", // Date for Biology exam
            subject: "Biology",
          },
          Friday: {
            date: "14/06/2025", // Date for Math exam
            subject: "Math",
          },
          Saturday: {
            date: "15/06/2025", // Date for Computer exam
            subject: "Computer",
          },
        },
      },
    },
    "Jane Smith": {
      classTimeTable: {
        Monday: [
          "History (Ms. D)",
          "Geography (Ms. I)",
          "PE (Mr. E)",
          "Lunch Break",
          "Art (Mr. J)",
          "Music (Ms. L)",
          "Math (Mr. A)",
          "Science (Mr. C)",
        ],
        Tuesday: [
          "English (Ms. B)",
          "Math (Mr. A)",
          "Computer (Mr. K)",
          "Lunch Break",
          "Physics (Mr. F)",
          "Chemistry (Ms. G)",
          "Biology (Mr. H)",
          "History (Ms. D)",
        ],
        Wednesday: [
          "Art (Mr. J)",
          "Music (Ms. L)",
          "History (Ms. D)",
          "Lunch Break",
          "Science (Mr. C)",
          "Geography (Ms. I)",
          "Math (Mr. A)",
          "English (Ms. B)",
        ],
        Thursday: [
          "Math (Mr. A)",
          "Physics (Mr. F)",
          "Chemistry (Ms. G)",
          "Lunch Break",
          "Biology (Mr. H)",
          "PE (Mr. E)",
          "Art (Mr. J)",
          "English (Ms. B)",
        ],
        Friday: [
          "Science (Mr. C)",
          "Computer (Mr. K)",
          "Math (Mr. A)",
          "Lunch Break",
          "English (Ms. B)",
          "History (Ms. D)",
          "Geography (Ms. I)",
          "Physics (Mr. F)",
        ],
        Saturday: [
          "Music (Ms. L)",
          "PE (Mr. E)",
          "Art (Mr. J)",
          "Lunch Break",
          "-",
          "-",
          "-",
          "-",
        ],
      },
      examTimeTables: {
        Monthly: {
          Monday: {
            date: "10/02/2025", // Date for Math exam
            subject: "Math",
          },
          Tuesday: {
            date: "11/02/2025", // Date for Physics exam
            subject: "Physics",
          },
          Wednesday: {
            date: "12/02/2025", // Date for Biology exam
            subject: "Biology",
          },
          Thursday: {
            date: "13/02/2025", // Date for Chemistry exam
            subject: "Chemistry",
          },
        },
        MidTerm: {
          Monday: {
            date: "05/04/2025", // Date for History exam
            subject: "History",
          },
          Tuesday: {
            date: "06/04/2025", // Date for Geography exam
            subject: "Geography",
          },
          Wednesday: {
            date: "07/04/2025", // Date for Art exam
            subject: "Art",
          },
          Thursday: {
            date: "08/04/2025", // Date for Music exam
            subject: "Music",
          },
        },
        Annual: {
          Monday: {
            date: "01/07/2025", // Date for English exam
            subject: "English",
          },
          Tuesday: {
            date: "02/07/2025", // Date for Math exam
            subject: "Maths",
          },
          Wednesday: {
            date: "03/07/2025", // Date for Science exam
            subject: "Science",
          },
          Thursday: {
            date: "04/07/2025", // Date for History exam
            subject: "History",
          },
          Friday: {
            date: "05/07/2025", // Date for Computer exam
            subject: "Computer",
          },
          Saturday: {
            date: "06/07/2025", // Date for Art exam
            subject: "Art",
          },
        },
      },
    },
  };

  const renderClassTimeTable = () => (
    <div>
      <h2>{selectedStudent}'s Class Time Table</h2>
      <table className="time-table">
        <thead>
          <tr>
            <th>Day/Timings</th>
            {[
              "9.00 AM - 10.00 AM",
              "10.00 AM - 11.00 AM",
              "11.00 AM - 12.00 PM",
              "12.00 PM - 1.00 PM",
              "1.00 PM - 2.00 PM",
              "2.00 PM - 3.00 PM",
              "3.00 PM - 4.00 PM",
              "4.00 PM - 5.00 PM",
            ].map((time) => (
              <th key={time}>{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(
            studentTimeTables[selectedStudent].classTimeTable
          ).map(([day, subjects]) => (
            <tr key={day}>
              <td>{day}</td>
              {subjects.map((subject, index) => (
                <td
                  key={index}
                  style={
                    subject === "Lunch Break"
                      ? { backgroundColor: "lightgrey" }
                      : {}
                  }
                >
                  {subject}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderExamTimeTable = () => (
    <div>
      <h2>
        {selectedStudent}'s {selectedExamType} Exam Time Table
      </h2>
      <table className="time-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>
              Subject (Timings:{" "}
              {selectedExamType === "Monthly"
                ? "10 AM to 11 AM"
                : selectedExamType === "MidTerm"
                ? "11 AM to 12:30 PM"
                : "2 PM to 5 PM"}
              )
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(
            studentTimeTables[selectedStudent].examTimeTables[selectedExamType]
          ).map(([day, { subject, date }]) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{date}</td>
              <td>{subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="app-container">
      <div className="main-content">
        <h2>Welcome to the Timetable Page!</h2>
        <p>
          Stay updated with your child's daily schedule. The class timetable
          provides an organized view of all subjects, timings, and activities
          for the academic year. Ensure your child is well-prepared for each day
          by reviewing the timetable regularly.
        </p>
        <h4>Select the Child to view their Time Table:</h4>
        <div className="student-buttons">
          {showJohnDoe && (
            <button
              onClick={() => {
                setSelectedStudent("John Doe");
                setShowJohnDoe(true);
                setShowJaneSmith(false);
                setShowBackButton(true); // Show back button
              }}
              style={{
                backgroundColor:
                  selectedStudent === "John Doe" ? "rgb(75, 73, 172)" : "",
                borderRadius: "50px",
                color: "white",
              }}
            >
              John Doe
            </button>
          )}
          {showJaneSmith && (
            <button
              onClick={() => {
                setSelectedStudent("Jane Smith");
                setShowJohnDoe(false);
                setShowJaneSmith(true);
                setShowBackButton(true); // Show back button
              }}
              style={{
                backgroundColor:
                  selectedStudent === "Jane Smith" ? "rgb(75, 73, 172)" : "",
                borderRadius: "50px",
                color: "white",
              }}
            >
              Jane Smith
            </button>
          )}
        </div>

        {showBackButton && (
          <button
            onClick={() => {
              setSelectedStudent(null);
              setShowBackButton(false);
              setShowJohnDoe(true);
              setShowJaneSmith(true);
              setSelectedTable(null);
              setSelectedExamType(null);
            }}
            style={{
              backgroundColor: "grey",
              borderRadius: "50px",
              marginTop: "20px",
            }}
          >
            Back
          </button>
        )}

        {selectedStudent && (
          <div className="options">
            <button
              onClick={() => setSelectedTable("Class")}
              style={{
                backgroundColor:
                  selectedTable === "Class" ? "rgb(75, 73, 172)" : "",
                borderRadius: "50px",
                color: "white",
              }}
            >
              Class Time Table
            </button>
            <button
              onClick={() => setSelectedTable("Exam")}
              style={{
                backgroundColor:
                  selectedTable === "Exam" ? "rgb(75, 72, 172)" : "",
                borderRadius: "50px",
                color: "white",
              }}
            >
              Exam Time Table
            </button>
          </div>
        )}

        {selectedTable === "Class" && renderClassTimeTable()}
        {selectedTable === "Exam" && (
          <div className="exam-options">
            {["Monthly", "MidTerm", "Annual"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedExamType(type)}
                style={{
                  backgroundColor:
                    selectedExamType === type ? "rgb(75, 73, 172)" : "",
                  borderRadius: "50px",
                  color: "white",
                }}
              >
                {type} Exam
              </button>
            ))}
            {selectedExamType && renderExamTimeTable()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
