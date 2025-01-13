import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LeaveHistoryTable = ({ leaveHistoryData, setLeaveHistoryData }) => {
  const [searchQueries, setSearchQueries] = useState({ john: "", janne: "" });
  const [currentPages, setCurrentPages] = useState({ john: 1, janne: 1 });
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Styles
  const buttonStyle = {
    backgroundColor: "rgb(75, 72, 172)",
    color: "white",
    padding: "6px 12px",
    fontSize: "0.8rem",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    fontWeight: "normal",
    marginRight: "6px",
  };
  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "20px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };
  const thStyle = {
    backgroundColor: "#f8f9fa",
    padding: "10px",
    textAlign: "center",
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
    border: "none",
  };
  const tdStyle = {
    padding: "10px",
    textAlign: "center",
    fontSize: "0.9rem",
    border: "none",
  };
  const thWithCursorStyle = {
    ...thStyle,
    cursor: "pointer",
    position: "relative",
  };
  const selectStyle = {
    display: "inline-block",
    width: "auto",
    padding: "6px 8px",
    fontSize: "1rem",
    verticalAlign: "middle",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    appearance: "none",
    background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" fill="none" viewBox="0 0 10 7"><path fill="grey" d="M0 0l5 6 5-6z"/></svg>') no-repeat right .5rem center`,
    paddingRight: "25px",
    borderWidth: "2px",
    borderColor: "#ced4da",
  };
  const paginationButtonStyle = {
    backgroundColor: "#f0f0f0", //This is the color of the prev and next button
    color: "black",
    padding: "6px 12px",
    fontSize: "0.8rem",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    fontWeight: "normal",
    marginRight: "6px",
  };
  const activePageStyle = {
    backgroundColor: "rgb(75, 72, 172)",
    color: "white",
  };
  const headerRowStyle = {};
  const paginationContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    whiteSpace: "nowrap",
  };
  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? "▲" : "▼";
  };
  // Load data from local storage on each render
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("leaveHistoryData");
      if (storedData) {
        setLeaveHistoryData(JSON.parse(storedData));
      } else {
        setLeaveHistoryData([]);
      }
    } catch (error) {
      console.error("Error loading data from local storage:", error);
    }
  }, [setLeaveHistoryData]);

  // Save data to localStorage whenever leaveHistoryData changes
  useEffect(() => {
    try {
      localStorage.setItem(
        "leaveHistoryData",
        JSON.stringify(leaveHistoryData)
      );
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  }, [leaveHistoryData]);

  // Separate the data by student name
  const separateLeaveHistory = () => {
    const johnData = leaveHistoryData.filter(
      (item) => item.studentName === "John Doe"
    );
    const janneData = leaveHistoryData.filter(
      (item) => item.studentName === "Jane Smith"
    );
    return { johnData, janneData };
  };

  const { johnData, janneData } = separateLeaveHistory();

  // Sort data
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortData = (data) => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  };

  const filteredData = (data, student) => {
    const searchQuery = searchQueries[student.toLowerCase()];
    return sortData(
      data.filter(
        (item) =>
          item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.referenceNo.includes(searchQuery) ||
          item.classTeacher.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  // Pagination Calculations
  const calculatePagination = (data, currentPage) => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return {
      currentRows: data.slice(indexOfFirstRow, indexOfLastRow),
      totalPages: Math.ceil(data.length / rowsPerPage),
    };
  };

  // Event Handlers
  const handleSearchChange = (student) => (e) => {
    setSearchQueries((prev) => ({ ...prev, [student]: e.target.value }));
    setCurrentPages((prev) => ({ ...prev, [student]: 1 }));
  };

  const handlePageChange = (student) => (direction) => {
    setCurrentPages((prev) => {
      const currentPage = prev[student];
      const totalPages = Math.ceil(
        filteredData(student === "john" ? johnData : janneData, student)
          .length / rowsPerPage
      );
      if (direction === "next" && currentPage < totalPages) {
        return { ...prev, [student]: currentPage + 1 };
      } else if (direction === "prev" && currentPage > 1) {
        return { ...prev, [student]: currentPage - 1 };
      }
      return prev;
    });
  };

  const handleRowsPerPageChange = (e, student) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPages((prev) => ({ ...prev, [student]: 1 }));
  };

  const handleStatusChange = (referenceNo) => {
    const updatedData = leaveHistoryData.map((item) =>
      item.referenceNo === referenceNo
        ? {
            ...item,
            status: item.status === "Pending" ? "Approved" : "Pending",
          }
        : item
    );
    setLeaveHistoryData(updatedData);
  };

  const handleDelete = (referenceNo) => {
    const updatedData = leaveHistoryData.filter(
      (item) => item.referenceNo !== referenceNo
    );
    setLeaveHistoryData(updatedData);
  };
  const renderPaginationButtons = (student) => {
    const currentPage = currentPages[student];
    const filtered = filteredData(
      student === "john" ? johnData : janneData,
      student
    );
    const totalPages = Math.ceil(filtered.length / rowsPerPage);

    return (
      <div
        className="dataTables_paginate paging_simple_numbers"
        id="order-listing_paginate"
      >
        <ul className="pagination">
          <li
            className={`paginate_button page-item previous ${
              currentPage === 1 ? "disabled" : ""
            }`}
            id="order-listing_previous"
          >
            <button
              aria-controls="order-listing"
              aria-disabled={currentPage === 1}
              role="link"
              data-dt-idx="previous"
              tabindex={currentPage === 1 ? -1 : 0}
              className="page-link"
              onClick={() => handlePageChange(student)("prev")}
            >
              Previous
            </button>
          </li>
          <li className="paginate_button page-item active">
            <span className="page-link" style={activePageStyle}>
              {currentPage}
            </span>
          </li>
          <li
            className={`paginate_button page-item next ${
              currentPage === totalPages || totalPages === 0 ? "disabled" : ""
            }`}
            id="order-listing_next"
          >
            <button
              aria-controls="order-listing"
              aria-disabled={currentPage === totalPages || totalPages === 0}
              role="link"
              data-dt-idx="next"
              tabindex={currentPage === totalPages || totalPages === 0 ? -1 : 0}
              className="page-link"
              onClick={() => handlePageChange(student)("next")}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    );
  };
  const renderTable = (student) => {
    const data = student === "john" ? johnData : janneData;
    const currentPage = currentPages[student];
    const searchQuery = searchQueries[student];
    const filtered = filteredData(data, student);
    const { currentRows, totalPages } = calculatePagination(
      filtered,
      currentPage
    );

    return (
      <div className="w-100 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span>
              Show
              <select
                className="form-select mx-2"
                style={selectStyle}
                value={rowsPerPage}
                onChange={(e) => handleRowsPerPageChange(e, student)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value={filtered.length}>All</option>
              </select>
              entries
            </span>
          </div>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange(student)}
          />
        </div>
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
            <thead style={headerRowStyle}>
              <tr>
                <th
                  style={thWithCursorStyle}
                  onClick={() => handleSort("referenceNo")}
                >
                  Order # {getSortArrow("referenceNo")}
                </th>
                <th
                  style={thWithCursorStyle}
                  onClick={() => handleSort("classTeacher")}
                >
                  Class Teacher {getSortArrow("classTeacher")}
                </th>
                <th
                  style={thWithCursorStyle}
                  onClick={() => handleSort("leaveStartDate")}
                >
                  Leave Start Date {getSortArrow("leaveStartDate")}
                </th>
                <th
                  style={thWithCursorStyle}
                  onClick={() => handleSort("leaveEndDate")}
                >
                  Leave End Date {getSortArrow("leaveEndDate")}
                </th>
                <th
                  style={thWithCursorStyle}
                  onClick={() => handleSort("remarks")}
                >
                  Remarks {getSortArrow("remarks")}
                </th>
                <th
                  style={thWithCursorStyle}
                  onClick={() => handleSort("status")}
                >
                  Status {getSortArrow("status")}
                </th>
                <th style={thWithCursorStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((row, index) => (
                  <tr key={row.referenceNo}>
                    <td style={tdStyle}>
                      {index + 1 + (currentPage - 1) * rowsPerPage}
                    </td>
                    <td style={tdStyle}>{row.classTeacher}</td>
                    <td style={tdStyle}>{row.leaveStartDate}</td>
                    <td style={tdStyle}>{row.leaveEndDate}</td>
                    <td style={tdStyle}>{row.remarks}</td>
                    <td style={tdStyle}>
                      <button
                        className={`btn btn-sm btn-rounded`}
                        onClick={() => handleStatusChange(row.referenceNo)}
                        style={{
                          ...buttonStyle,
                          backgroundColor: "transparent",
                          color:
                            row.status === "Pending"
                              ? "rgb(255, 71, 71)"
                              : "rgb(87, 182, 87)",
                          border:
                            row.status === "Pending"
                              ? `1px solid rgb(255, 71, 71)`
                              : `1px solid rgb(87, 182, 87)`,
                        }}
                      >
                        {row.status === "Pending" ? "Pending" : "Approved"}
                      </button>
                    </td>
                    <td style={tdStyle}>
                      <button
                        className="btn btn-sm btn-rounded"
                        onClick={() => handleDelete(row.referenceNo)}
                        style={{
                          ...buttonStyle,
                          backgroundColor: "transparent",
                          color: "rgb(75,72,172)",
                          border: "1px solid rgb(75,72,172)",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center" style={tdStyle}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={paginationContainerStyle}>
          <div style={{ marginRight: "10px" }}>
            Showing
            {(currentPage - 1) * rowsPerPage + 1} to
            {Math.min(currentPage * rowsPerPage, filtered.length)} of 
            {filtered.length} entries
          </div>
          {renderPaginationButtons(student)}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h2 className="text-center">Leave History Table</h2>
      <h3>John Doe</h3>
      {renderTable("john")}
      <h3>Jane Smith</h3>
      {renderTable("janne")}
    </div>
  );
};

export default LeaveHistoryTable;
