import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const localizer = momentLocalizer(moment);

const App = () => {
  const [events] = useState([
    {
      title: "PTM (Parent-Teacher Meeting)",
      start: moment("2025-01-06").toDate(),
      end: moment("2025-01-06").toDate(),
      allDay: true,
      eventType: "PTM",
    },
    {
      title: "Sports Day",
      start: moment("2025-01-15").toDate(),
      end: moment("2025-01-15").toDate(),
      allDay: true,
      eventType: "SportsDay",
    },
    {
      title: "Long Weekend",
      start: moment("2024-12-26").toDate(),
      end: moment("2025-01-02").toDate(),
      allDay: true,
      eventType: "LongWeekend",
    },
  ]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showStudentSelection, setShowStudentSelection] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [attendanceData] = useState({
    "John Doe": [
      { date: "2025-01-01", status: "Present" },
      { date: "2025-01-02", status: "Absent" },
      { date: "2025-01-03", status: "Present" },
      { date: "2025-01-04", status: "Absent" },
      { date: "2025-01-05", status: "Present" },
      { date: "2025-01-06", status: "Absent" },
      { date: "2025-01-07", status: "Present" },
      { date: "2025-01-08", status: "Absent" },
      { date: "2025-01-09", status: "Present" },
      { date: "2025-01-10", status: "Absent" },
    ],
    "Jane Smith": [
      { date: "2025-01-01", status: "Present" },
      { date: "2025-01-02", status: "Present" },
      { date: "2025-01-03", status: "Absent" },
      { date: "2025-01-04", status: "Absent" },
      { date: "2025-01-05", status: "Present" },
      { date: "2025-01-06", status: "Absent" },
      { date: "2025-01-07", status: "Present" },
      { date: "2025-01-08", status: "Absent" },
      { date: "2025-01-09", status: "Present" },
      { date: "2025-01-10", status: "Absent" },
    ],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const filteredData = attendanceData[selectedStudent] || [];
  const searchedData = filteredData.filter(
    (item) =>
      item.date.includes(searchTerm) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages =
    entriesPerPage === "All"
      ? 1
      : Math.ceil(searchedData.length / entriesPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const paginatedData =
    entriesPerPage === "All"
      ? searchedData
      : searchedData.slice(
          (currentPage - 1) * entriesPerPage,
          currentPage * entriesPerPage
        );

  const eventPropGetter = (event) => {
    let backgroundColor = "rgb(75, 73, 172)"; // Default color
    if (event.eventType === "LongWeekend") {
      backgroundColor = "rgb(255, 71, 71)";
    }
    return { style: { backgroundColor } };
  };

  return (
    <div className="container mt-3 text-center">
      <h2 className="text-center mb-4">Student Attendance System</h2>
      <p>
        "Dear Parent,
        <br />
        We're delighted to have you here! This portal provides an overview of
        your Child's attendance, helping you stay informed about your Child's
        progress."
      </p>
      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn rounded-pill"
          style={{
            backgroundColor: "rgb(75, 72, 172)",
            color: "white",
            border: "none",
            marginRight: "10px",
          }}
          onClick={() => {
            setShowCalendar(false);
            setShowStudentSelection(true);
          }}
        >
          Attendance
        </button>

        <button
          className="btn rounded-pill"
          style={{
            backgroundColor: "rgb(75, 72, 172)",
            color: "white",
            border: "none",
          }}
          onClick={() => setShowCalendar(true)}
        >
          Open Calendar
        </button>
      </div>

      {showCalendar ? (
        <div
          className="card"
          style={{
            backgroundColor: "white",
            transform: "none",
            transition: "none",
            padding: "3rem",
          }}
        >
          <div className="card-body">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 400 }}
              eventPropGetter={eventPropGetter}
              views={["month", "week", "day"]}
              messages={{
                next: ">",
                previous: "<",
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          {showStudentSelection && (
            <div>
              <h4>Select a Student:</h4>
              <div className="btn-group mb-3">
                <button
                  className="btn rounded-pill"
                  style={{
                    backgroundColor: "rgb(75, 72, 172)",
                    color: "white",
                    border: "none",
                    marginRight: "10px",
                  }}
                  onClick={() => setSelectedStudent("John Doe")}
                >
                  John Doe
                </button>
                <button
                  className="btn rounded-pill"
                  style={{
                    backgroundColor: "rgb(75, 72, 172)",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => setSelectedStudent("Jane Smith")}
                >
                  Jane Smith
                </button>
              </div>
            </div>
          )}

          {selectedStudent && (
            <div
              className="card"
              style={{
                backgroundColor: "white",
                transform: "none",
                transition: "none",
                padding: "3rem",
              }}
            >
              <h4>Attendance for {selectedStudent}:</h4>
              <div className="d-flex justify-content-between mb-3">
                <select
                  className="form-select w-25"
                  value={entriesPerPage}
                  onChange={(e) =>
                    setEntriesPerPage(
                      e.target.value === "All"
                        ? "All"
                        : parseInt(e.target.value)
                    )
                  }
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="All">All</option>
                </select>
                <input
                  type="text"
                  className="form-control w-50"
                  placeholder="Search by date or status"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "Present"
                              ? "btn-outline-present"
                              : "btn-outline-absent"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {entriesPerPage !== "All" && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
                    {Math.min(
                      currentPage * entriesPerPage,
                      searchedData.length
                    )}{" "}
                    of {searchedData.length} entries
                  </div>
                  <ul className="pagination justify-content-end">
                    <li
                      className={`paginate_button page-item previous ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                      onClick={handlePrevious}
                    >
                      <a href="#" className="page-link">
                        Previous
                      </a>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index}
                        className={`paginate_button page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <a
                          href="#"
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li
                      className={`paginate_button page-item next ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                      onClick={handleNext}
                    >
                      <a href="#" className="page-link">
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <style>
        {`
            .pagination .page-item.active .page-link {
              background-color: #4B49AC;
              border-color: #007bff;
              color: white;
            }
            .pagination .page-item.disabled .page-link {
              background: white;
              border-color: #CED4DA;
              color: #797779;
              pointer-events: none;
            }
            .pagination .page-item .page-link:hover {
              background-color: #4B49AC;
              border-color: #4B49AC;
              color: white;
            }

            .btn-outline-present {
              background-color: transparent;
              color: rgb(87, 182, 87);
              border: 2px solid rgb(87, 182, 87);
              padding: 10px 20px;
              border-radius: 50px;
              font-size: 16px;
              font-weight: 500;
              text-decoration: none;
              transition: all 0.3s ease;
            }

            .btn-outline-present:hover {
              background-color: rgb(87, 182, 87);
              color: white;
              border-color: rgb(87, 182, 87);
            }

            .btn-outline-absent {
              background-color: transparent;
              color: rgb(255, 71, 71);
              border: 2px solid rgb(255, 71, 71);
              padding: 10px 20px;
              border-radius: 50px;
              font-size: 16px;
              font-weight: 500;
              text-decoration: none;
              transition: all 0.3s ease;
            }

            .btn-outline-absent:hover {
              background-color: rgb(255, 71, 71);
              color: white;
              border-color: rgb(255, 71, 71);
            }
            .rbc-today {
              background-color: rgb(252, 248, 227);
            }
          `}
      </style>
    </div>
  );
};

export default App;
