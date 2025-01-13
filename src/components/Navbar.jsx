
import React, { useState } from "react";
import "./Navbar.css"; // Apply the provided CSS styles

const Navbar = ({ toggleSidebar }) => {
  // State to manage the visibility of the 'Parent Dashboard' text
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Toggle the sidebar and manage the visibility of the 'Parent Dashboard' text
  const handleSidebarToggle = () => {
    setIsSidebarVisible((prevState) => !prevState);
    toggleSidebar(); // Call the parent function to toggle the sidebar as well
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        {/* Sidebar Section */}
        <div className="d-flex align-items-center">
          {/* School Logo */}
          <a className="navbar-brand" href="#">
            <img
              src="/images/logo.png"
              alt="School Logo"
              width="40px"
              height="40px"
            />
          </a>
          {/* Conditionally render Parent Dashboard text */}
          {isSidebarVisible && (
            <a className="navbar-brand" href="#">
              Parent Dashboard
            </a>
          )}

          {/* Sidebar Toggler - Always Visible */}
          <button
            className="sidebar-toggler"
            type="button"
            onClick={handleSidebarToggle}
            aria-label="Toggle sidebar"
          >
            <i className="bi bi-list"></i>
          </button>
        </div>

        {/* Navbar Content */}
        <div className="navbar-collapse show">
          {" "}
          {/* Keep navbar always visible */}
          <ul className="navbar-nav me-auto">{/* No navigation links */}</ul>
          {/* Right-side Navbar Items */}
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {/* Notifications */}
            <li className="nav-item dropdown bell-container">
              <a
                className="nav-link dropdown-toggle"
                id="notificationDropdown"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-danger">3</span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="notificationDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="ti-info-alt"></i> Application Error
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="ti-settings"></i> Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="ti-user"></i> New Registration
                  </a>
                </li>
              </ul>
            </li>

            {/* Profile Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
                id="profileDropdown"
              >
                <img
                  src="https://via.placeholder.com/30"
                  alt="profile"
                  className="rounded-circle"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="profileDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="ti-settings text-primary"></i> Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="ti-power-off text-primary"></i> Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;  
