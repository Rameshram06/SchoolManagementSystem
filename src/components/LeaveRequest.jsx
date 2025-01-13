import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse, Button } from "react-bootstrap";
import LeaveHistoryTable from "./LeaveHistoryTable";

const LeaveRequest = () => {
  const navigate = useNavigate();
  const initialLeaveDetails = {
    studentName: "",
    classTeacher: "",
    leaveStartDate: "",
    leaveEndDate: "",
    remarks: "",
  };

  const [leaveDetails, setLeaveDetails] = useState(initialLeaveDetails);
  const [leaveHistoryData, setLeaveHistoryData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [openJohn, setOpenJohn] = useState(false);
  const [openJane, setOpenJane] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLeaveApplied, setIsLeaveApplied] = useState(false);
  const [leaveStudentName, setLeaveStudentName] = useState(""); //State to store student name

  const inputStyle = {
    border: "1px solid #e0e0e0",
    padding: "8px",
    borderRadius: "4px",
    marginBottom: "8px",
    width: "100%",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "0.9rem",
  };
  const buttonStyle = {
    backgroundColor: "rgb(75, 73, 172)",
    color: "white",
    padding: "6px 12px",
    fontSize: "0.8rem",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    fontWeight: "normal",
    marginRight: "6px",
  };
  const popupOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const popupStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    minWidth: "300px",
    textAlign: "center",
    fontSize: "1rem",
    maxWidth: "80%",
    maxHeight: "80%",
    overflow: "auto",
  };
  const swalIconStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
  };
  const swalIconCircleStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#e8f5e9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10px",
    marginBottom: "5px",
  };
  const swalTitleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const swalTextStyle = {
    fontSize: "1.2rem",
    marginBottom: "20px",
  };

  // Load leave history from localStorage on component mount
  useEffect(() => {
    const storedLeaveHistory = localStorage.getItem("leaveHistoryData");
    if (storedLeaveHistory) {
      setLeaveHistoryData(JSON.parse(storedLeaveHistory));
    } else {
      console.log("No leave history found in localStorage");
    }
  }, []);

  // Save leave history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("leaveHistoryData", JSON.stringify(leaveHistoryData));
  }, [leaveHistoryData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveDetails((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let errors = {};
    Object.keys(leaveDetails).forEach((key) => {
      if (!leaveDetails[key] && key !== "studentName") {
        errors[key] = `Please fill the ${key
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()}`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addLeaveRequestToHistory = (newLeaveApplication) => {
    setLeaveHistoryData((prev) => [...prev, newLeaveApplication]);
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const studentName = openJohn ? "John Doe" : openJane ? "Jane Smith" : "";
      setLeaveStudentName(studentName); // Set the student name before showing the popup

      // Simulate API call
      setTimeout(() => {
        const newLeaveData = {
          ...leaveDetails,
          studentName: studentName,
          status: "Pending",
          referenceNo: Math.random().toString(36).substring(7),
        };

        addLeaveRequestToHistory(newLeaveData);
        setLeaveDetails(initialLeaveDetails);
        setIsLeaveApplied(true);
      }, 1000);
    }
  };

  const handleCancel = () => {
    setLeaveDetails(initialLeaveDetails);
    setFormErrors({});
    setSuccessMessage("");
  };
  const handleContinue = () => {
    setIsLeaveApplied(false);
  };

  const handleHistoryClick = () => {
    setShowHistory(!showHistory);
    setOpenJohn(false);
    setOpenJane(false);
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="container-fluid px-4 py-3">
      <div
        className="leave-form mx-auto"
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#007bff",
            marginBottom: "20px",
          }}
        >
          Leave Application
        </h2>
        <p className="text-secondary text-center">
          <em>
            Fields marked with <span className="text-danger">*</span> are
            mandatory.
          </em>
        </p>

        {successMessage && (
          <div className="alert alert-success mb-4">{successMessage}</div>
        )}
        {isLeaveApplied && (
          <div style={popupOverlayStyle}>
            <div style={popupStyle}>
              <div style={swalIconStyle}>
                <div style={swalIconCircleStyle}>
                  <i
                    className="fa fa-check"
                    style={{ fontSize: "3em", color: "#4caf50" }}
                  />
                </div>
              </div>
              <div style={swalTitleStyle}>Successful!</div>
              <div style={swalTextStyle}>
                Leave application submitted successfully for {leaveStudentName}!
              </div>
              <button onClick={handleContinue} style={buttonStyle}>
                Continue
              </button>
            </div>
          </div>
        )}

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
          <Button
            variant="primary"
            onClick={() => setOpenJohn(!openJohn)}
            aria-controls="johnDoeLeaveForm"
            aria-expanded={openJohn}
            className="btn-rounded"
            style={buttonStyle}
          >
            John Doe
          </Button>
          <Button
            variant="primary"
            onClick={() => setOpenJane(!openJane)}
            aria-controls="janeSmithLeaveForm"
            aria-expanded={openJane}
            className="btn-rounded"
            style={buttonStyle}
          >
            Jane Smith
          </Button>
          <Button
            variant="info"
            onClick={handleHistoryClick}
            className="btn-rounded"
            style={buttonStyle}
          >
            {showHistory ? "Hide Leave History" : "Show Leave History"}
          </Button>
        </div>

        {showHistory && (
          <LeaveHistoryTable
            leaveHistoryData={leaveHistoryData}
            setLeaveHistoryData={setLeaveHistoryData}
          />
        )}

        {!showHistory && (
          <>
            <Collapse in={openJohn}>
              <div id="johnDoeLeaveForm">
                <h4>Leave Application for John Doe</h4>
                {renderForm()}
              </div>
            </Collapse>

            <Collapse in={openJane}>
              <div id="janeSmithLeaveForm">
                <h4>Leave Application for Jane Smith</h4>
                {renderForm()}
              </div>
            </Collapse>
          </>
        )}
      </div>
    </div>
  );

  function renderForm() {
    return (
      <form>
        <div className="form-group mb-3">
          <label>
            Class Teacher <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${
              formErrors.classTeacher ? "is-invalid" : ""
            }`}
            name="classTeacher"
            value={leaveDetails.classTeacher}
            onChange={handleInputChange}
            style={inputStyle}
          />
          {formErrors.classTeacher && (
            <div className="invalid-feedback">{formErrors.classTeacher}</div>
          )}
        </div>
        <div className="form-group mb-3">
          <label>
            Leave Start Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className={`form-control ${
              formErrors.leaveStartDate ? "is-invalid" : ""
            }`}
            name="leaveStartDate"
            value={leaveDetails.leaveStartDate}
            onChange={handleInputChange}
            style={inputStyle}
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
          />
          {formErrors.leaveStartDate && (
            <div className="invalid-feedback">{formErrors.leaveStartDate}</div>
          )}
        </div>
        <div className="form-group mb-3">
          <label>
            Leave End Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className={`form-control ${
              formErrors.leaveEndDate ? "is-invalid" : ""
            }`}
            name="leaveEndDate"
            value={leaveDetails.leaveEndDate}
            onChange={handleInputChange}
            style={inputStyle}
            min={
              leaveDetails.leaveStartDate ||
              new Date().toISOString().split("T")[0]
            } // Prevent past dates and ensure end date is not before the start date
          />
          {formErrors.leaveEndDate && (
            <div className="invalid-feedback">{formErrors.leaveEndDate}</div>
          )}
        </div>
        <div className="form-group mb-3">
          <label>
            Remarks <span className="text-danger">*</span>
          </label>
          <textarea
            className={`form-control ${formErrors.remarks ? "is-invalid" : ""}`}
            name="remarks"
            rows="3"
            placeholder="Reason for leave"
            value={leaveDetails.remarks}
            onChange={handleInputChange}
            style={inputStyle}
          ></textarea>
          {formErrors.remarks && (
            <div className="invalid-feedback">{formErrors.remarks}</div>
          )}
        </div>
        <div className="form-group d-flex justify-content-end">
          <button
            className="btn btn-danger me-2 btn-rounded"
            type="button"
            onClick={handleCancel}
            style={buttonStyle}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary btn-rounded me-2"
            type="button"
            onClick={handleApplyLeave}
            style={buttonStyle}
          >
            Apply Leave
          </button>
          <button
            onClick={handleBack}
            className="btn btn-secondary btn-rounded"
            style={buttonStyle}
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    );
  }
};

export default LeaveRequest;
