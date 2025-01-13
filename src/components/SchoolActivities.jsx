import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SchoolActivities.css";

const SchoolActivities = () => {
  const activities = [
    {
      name: "Art Exhibition",
      date: "05-10-2024",
      category: "Art & Culture",
      status: "Completed",
    },
    {
      name: "Science Fair",
      date: "15-11-2024",
      category: "Education",
      status: "Completed",
    },
    {
      name: "Orientation for New Students",
      date: "01-04-2025",
      category: "Orientation",
      status: "Upcoming",
    },
    {
      name: "Earth Day Celebrations",
      date: "22-04-2025",
      category: "Environmental Awareness",
      status: "Upcoming",
    },
    {
      name: "Sports Tryouts",
      date: "15-05-2025",
      category: "Sports",
      status: "Upcoming",
    },
    {
      name: "Creative Arts Week",
      date: "25-05-2025",
      category: "Art & Culture",
      status: "Upcoming",
    },
    {
      name: "Field Trip to Science Center",
      date: "15-06-2025",
      category: "Educational",
      status: "Upcoming",
    },
    {
      name: "Independence Day Celebration",
      date: "15-08-2025",
      category: "Celebration",
      status: "Upcoming",
    },
    {
      name: "Debate and Public Speaking Competition",
      date: "10-09-2025",
      category: "Academics",
      status: "Upcoming",
    },
    {
      name: "Teacher's Day Celebrations",
      date: "05-09-2025",
      category: "Celebration",
      status: "Upcoming",
    },
    {
      name: "Inter-School Quiz Competition",
      date: "12-10-2025",
      category: "Academics",
      status: "Upcoming",
    },
    {
      name: "Annual Sports Day",
      date: "20-10-2025",
      category: "Sports",
      status: "Upcoming",
    },
    {
      name: "Talent Show",
      date: "05-11-2025",
      category: "Arts & Culture",
      status: "Upcoming",
    },
    {
      name: "Children’s Day Activities",
      date: "14-11-2025",
      category: "Celebration",
      status: "Upcoming",
    },
    {
      name: "New Year Assembly",
      date: "01-01-2026",
      category: "Celebration",
      status: "Upcoming",
    },
    {
      name: "Republic Day Celebration",
      date: "26-01-2026",
      category: "Celebration",
      status: "Upcoming",
    },
    {
      name: "Health and Wellness Week",
      date: "15-02-2026",
      category: "Health",
      status: "Upcoming",
    },
    {
      name: "Annual Day",
      date: "20-04-2026",
      category: "Celebration",
      status: "Upcoming",
    },
    {
      name: "Farewell Party",
      date: "30-04-2026",
      category: "Celebration",
      status: "Upcoming",
    },
    {
      name: "Book Fair",
      date: "10-10-2026",
      category: "Literary",
      status: "Upcoming",
    },
  ];

  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredActivities.length / entriesPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Sidebar Column */}
        <div className="col-md-1">
          {/* Sidebar content can be added here */}
        </div>

        {/* Main Content Column */}
        <div className="col-md-10">
          <div className="content-wrapper">
            <div className="card no-hover-card">
              <div className="card-body">
                <h4 className="card-title">School Activities</h4>

                {/* Controls */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>
                      Show{" "}
                      <select
                        className="form-select form-select-sm"
                        value={entriesPerPage}
                        onChange={(e) => {
                          setEntriesPerPage(Number(e.target.value));
                          setCurrentPage(1); // Reset to first page
                        }}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={filteredActivities.length}>All</option>
                      </select>{" "}
                      entries
                    </label>
                  </div>
                  <div className="col-md-6 text-end">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // Reset to first page
                      }}
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Activity #</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedActivities.map((activity, index) => (
                        <tr key={index}>
                          <td>
                            {(currentPage - 1) * entriesPerPage + index + 1}
                          </td>
                          <td>{activity.name}</td>
                          <td>{activity.date}</td>
                          <td>{activity.category}</td>
                          <td>
                            <label
                              className={`badge ${
                                activity.status === "Upcoming"
                                  ? "badge-warning"
                                  : activity.status === "Completed"
                                  ? "badge-success"
                                  : "badge-info"
                              }`}
                            >
                              {activity.status}
                            </label>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Showing Entries Information & Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  {/* Showing entries information on left side */}
                  <div>
                    Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
                    {Math.min(
                      currentPage * entriesPerPage,
                      filteredActivities.length
                    )}{" "}
                    of {filteredActivities.length} entries
                  </div>

                  {/* Pagination controls on right side */}
                  <div className="w-100">
                    <ul className="pagination justify-content-end">
                      <li
                        className={`page-item previous ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                        onClick={handlePrevious}
                      >
                        <a
                          href="#"
                          className="page-link"
                          aria-disabled={currentPage === 1 ? "true" : "false"}
                        >
                          Previous
                        </a>
                      </li>

                      {/* Page Numbers */}
                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
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
                        className={`page-item next ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                        onClick={handleNext}
                      >
                        <a
                          href="#"
                          className="page-link"
                          aria-disabled={
                            currentPage === totalPages ? "true" : "false"
                          }
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolActivities;
