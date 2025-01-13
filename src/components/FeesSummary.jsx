import { useState } from "react";
import { FaHistory, FaList, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import '../css/feessummary.css';  // Import the CSS file
// import "./FeesSummary.css";

const FeesSummary = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null); // Track the selected child
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility
  const navigate = useNavigate();

  // Dummy data for Payment History with total, paid, and due fees
  const paymentHistoryData = [
    {
      paymentNumber: "P12345",
      totalFees: 10000,
      feesPaid: 5000,
      dueFees: 5000,
      paidDate: "19-12-2024",
      paidTime: "06:18 PM",
      childName: "John",
      paymentMode: "Online",
      isDue: true,
      paymentLink: "https://rzp.io/rzp/MVFqQza",
    },
    {
      paymentNumber: "P12346",
      totalFees: 10000,
      feesPaid: 8000,
      dueFees: 2000,
      paidDate: "09-11-2024",
      paidTime: "11:30 AM",
      childName: "Max",
      paymentMode: "Online",
      isDue: true,
      paymentLink: "https://rzp.io/rzp/prj59S6",
    },
    {
      paymentNumber: "P12347",
      totalFees: 10000,
      feesPaid: 10000,
      dueFees: 0,
      paidDate: "12-11-2024",
      paidTime: "02:00 PM",
      childName: "Wick",
      paymentMode: "Cash",
      isDue: false,
      paymentLink: "https://razorpay.com/example-link-3",
    },
  ];

  // Dummy data for Fees Structure
  const feesStructure = [
    { feeType: "Tuition Fee", class8: 5000, class9: 5500, class10: 6000 },
    { feeType: "Registration Fee", class8: 1000, class9: 1000, class10: 1200 },
    { feeType: "Books", class8: 500, class9: 500, class10: 600 },
    { feeType: "Uniform (2 sets)", class8: 1200, class9: 1300, class10: 1400 },
    {
      feeType: "Transportation Fee",
      class8: 1500,
      class9: 1600,
      class10: 1800,
    },
    { feeType: "Library Fee", class8: 500, class9: 500, class10: 600 },
    { feeType: "Sports Fee", class8: 300, class9: 300, class10: 350 },
  ];

  const handleBack = () => {
    navigate("/parent-dashboard"); // Redirect to Parent Dashboard on back button click
  };

  // Get list of children with payment due
  const childrenWithDuePayments = paymentHistoryData
    .filter((payment) => payment.isDue)
    .map((payment) => payment.childName);

  // Handle child selection from dropdown
  const handleChildSelection = (childName) => {
    setSelectedChild(childName); // Select the child
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Sidebar Column */}
        <div className="col-md-3">{/* Sidebar can be added here */}</div>

        {/* Main Content Column */}
        <div className="col-md-9">
          <div className="container">
            <h3 className="text-center">Fees Summary</h3>

            {/* Back Button */}
            <button
              className="btn btn-secondary mb-3"
              onClick={handleBack}
              style={{ borderRadius: 50 }}
            >
              <FaArrowLeft /> Back
            </button>

            {/* Payment Due Alert with scroll animation */}
            {childrenWithDuePayments.length > 0 && (
              <div key={Date.now()} className="alert alert-warning">
                <strong>Payment is due for these children:</strong>{" "}
                {childrenWithDuePayments.join(", ")}. Please pay the due fees as
                soon as possible.
              </div>
            )}

            {/* Fee Summary Section */}
            <div className="d-flex justify-content-center mb-3">
              <button
                className="btn btn-info mx-2"
                onClick={() => setActiveSection("paymentHistory")}
                style={{ borderRadius: 50 }}
              >
                <FaHistory /> Payment History
              </button>
              <button
                className="btn btn-info mx-2"
                onClick={() => setActiveSection("feesStructure")}
                style={{ borderRadius: 50 }}
              >
                <FaList /> Fees Structure
              </button>
            </div>

            {/* Payment History */}
            {activeSection === "paymentHistory" && (
              <div>
                <h4>
                  {selectedChild
                    ? `${selectedChild}'s Payment History`
                    : "Select a Child to View Payment History"}
                </h4>

                {/* Dropdown to select child */}
                <div className="mb-3">
                  <button
                    className="btn btn-info dropdown-toggle"
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
                    style={{ borderRadius: 50 }}
                  >
                    {selectedChild ? selectedChild : "Select Child"}
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown-menu show">
                      {Array.from(
                        new Set(
                          paymentHistoryData.map((payment) => payment.childName)
                        )
                      ).map((childName, index) => (
                        <li key={index}>
                          <a
                            className="dropdown-item"
                            onClick={() => handleChildSelection(childName)}
                          >
                            {childName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Table showing payment history */}
                {selectedChild && (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Payment Number</th>
                          <th>Total Fees</th>
                          <th>Fees Paid</th>
                          <th>Due Fees</th>
                          <th>Payment Mode</th>
                          <th>Paid Date & Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistoryData
                          .filter(
                            (payment) => payment.childName === selectedChild
                          )
                          .map((payment, index) => (
                            <tr key={index}>
                              <td>{payment.paymentNumber}</td>
                              <td>₹{payment.totalFees}</td>
                              <td>₹{payment.feesPaid}</td>
                              <td>₹{payment.dueFees}</td>
                              <td>
                                {payment.feesPaid === 0
                                  ? "N/A"
                                  : payment.paymentMode}
                              </td>
                              <td>{`${payment.paidDate} ${payment.paidTime}`}</td>
                              <td>
                                {payment.isDue ? (
                                  <a
                                    href={payment.paymentLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline btn-fw"
                                  >
                                    Pay Now
                                  </a>
                                ) : (
                                  <button className="btn btn-success" disabled>
                                    Paid
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Fees Structure */}
            {activeSection === "feesStructure" && (
              <div>
                <h4>FEES STRUCTURE 2024/2025</h4>
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Fee Type</th>
                        <th>Class 8</th>
                        <th>Class 9</th>
                        <th>Class 10</th>
                        <th>Total Fee</th> {/* Add Total Fee header */}
                      </tr>
                    </thead>
                    <tbody>
                      {feesStructure.map((fee, index) => {
                        // Calculate total fee for each fee type
                        const totalFee = fee.class8 + fee.class9 + fee.class10;
                        return (
                          <tr key={index}>
                            <td>{fee.feeType}</td>
                            <td>₹{fee.class8}</td>
                            <td>₹{fee.class9}</td>
                            <td>₹{fee.class10}</td>
                            <td>₹{totalFee}</td>{" "}
                            {/* Display the calculated total fee */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesSummary;
