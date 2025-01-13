import React, { useState, useEffect } from "react";
import "animate.css";
import "font-awesome/css/font-awesome.min.css";
import "../components/Dashboard.css";
import { BsCloudSunFill } from "react-icons/bs";
import { FcCalendar } from "react-icons/fc";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importing calendar's default styles

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar visibility

  // Toggle calendar visibility when calendar icon is clicked
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="row">
              <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                <h3 className="font-weight-bold">Welcome Parent</h3>
                <h6 className="font-weight-normal mb-0">
                  All systems are running smoothly! You have{" "}
                  <a className="text-primary" href="/notifications">
                    1 unread alerts!
                  </a>
                </h6>
              </div>
              <div className="col-12 col-xl-4">
                <div className="justify-content-end d-flex">
                  <button
                    className="btn btn-sm btn-light"
                    onClick={toggleCalendar}
                  >
                    <FcCalendar /> {currentDate}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Show Calendar when showCalendar is true */}
        {showCalendar && (
          <div className="calendar-container">
            <Calendar />
          </div>
        )}

        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card tale-bg no-hover-card">
              <div className="card-people mt-auto">
                {/* Weather Information above the image */}
                <div className="weather-info">
                  <div className="d-flex">
                    <div>
                      <h2 className="mb-0 font-weight-normal">
                        <BsCloudSunFill />
                        31<sup>C</sup>
                      </h2>
                    </div>
                    <div className="ms-2">
                      <h4 className="location font-weight-normal">Chicago</h4>
                      <h6 className="font-weight-normal">Illinois</h6>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <img
                  src="./assets/Images/dashboard1/people.png"
                  alt="people"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 grid-margin transparent">
            <div className="row">
              <div className="col-md-6 mb-4 stretch-card transparent">
                <div className="card card-tale no-hover-card">
                  <div className="card-body">
                    <p className="mb-4">Today's Bookings</p>
                    <p className="fs-30 mb-2">4006</p>
                    <p>10.00% (30 days)</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4 stretch-card transparent">
                <div className="card card-dark-blue no-hover-card">
                  <div className="card-body">
                    <p className="mb-4">Total Bookings</p>
                    <p className="fs-30 mb-2">61344</p>
                    <p>22.00% (30 days)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                <div className="card card-light-blue no-hover-card">
                  <div className="card-body">
                    <p className="mb-4">Number of Meetings</p>
                    <p className="fs-30 mb-2">34040</p>
                    <p>2.00% (30 days)</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 stretch-card transparent">
                <div className="card card-light-danger no-hover-card">
                  <div className="card-body">
                    <p className="mb-4">Number of Clients</p>
                    <p className="fs-30 mb-2">47033</p>
                    <p>0.22% (30 days)</p>
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

export default Dashboard;
