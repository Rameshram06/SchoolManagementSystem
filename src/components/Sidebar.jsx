import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure you're using Link for routing
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";

const Sidebar = ({ isCollapsed }) => {
  const [isMyChildrenOpen, setIsMyChildrenOpen] = useState(false);

  const toggleMyChildren = () => {
    setIsMyChildrenOpen(!isMyChildrenOpen);
  };

  return (
    <nav
      className={`sidebar sidebar-offcanvas ${isCollapsed ? "collapsed" : ""}`}
      id="sidebar"
    >
      <ul className="nav flex-column">
        {/* Dashboard */}
        <li className="nav-item active menu-item">
          <Link className="nav-link" to="/dashboard">
            <i className="bi bi-grid menu-icon"></i>
            {!isCollapsed && <span className="menu-title">Dashboard</span>}
            <div className="submenu">
              {isCollapsed && <span>Dashboard</span>}
            </div>
          </Link>
        </li>

        {/* My Children (Collapsible) */}
        <li className="nav-item menu-item">
          <a
            className="nav-link"
            onClick={toggleMyChildren} // Toggle collapse on click
            href="#"
            aria-expanded={isMyChildrenOpen}
            aria-controls="my-children"
          >
            <i className="bi bi-person menu-icon"></i>
            {!isCollapsed && <span className="menu-title">My Children</span>}
            <i className={`menu-arrow ${isMyChildrenOpen ? "rotate" : ""}`}></i>
            <div className="submenu">
              {isCollapsed && <span>My Children</span>}
              {isCollapsed && (
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-child/1">
                      John Doe
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-child/2">
                      Jane Smith
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </a>
          <div
            className={`collapse ${isMyChildrenOpen ? "show" : ""}`}
            id="my-children"
          >
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/my-child/1">
                  John Doe
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-child/2">
                  Jane Smith
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Other links */}
        <li className="nav-item menu-item">
          <Link className="nav-link" to="/assignments">
            <i className="bi bi-book menu-icon"></i>
            {!isCollapsed && <span className="menu-title">Assignments</span>}
            <div className="submenu">
              {isCollapsed && <span>Assignments</span>}
            </div>
          </Link>
        </li>

        <li className="nav-item menu-item">
          <Link className="nav-link" to="/attendance">
            <i className="bi bi-calendar-check menu-icon"></i>
            {!isCollapsed && <span className="menu-title">Attendance</span>}
            <div className="submenu">
              {isCollapsed && <span>Attendance</span>}
            </div>
          </Link>
        </li>

        <li className="nav-item menu-item">
          <Link className="nav-link" to="/marks-report">
            <i className="bi bi-bar-chart-line menu-icon"></i>
            {!isCollapsed && <span className="menu-title">Marks Report</span>}
            <div className="submenu">
              {isCollapsed && <span>Marks Report</span>}
            </div>
          </Link>
        </li>

        <li className="nav-item menu-item">
          <Link className="nav-link" to="/school-activities">
            <i className="bi bi-activity menu-icon"></i>
            {!isCollapsed && (
              <span className="menu-title">School Activities</span>
            )}
            <div className="submenu">
              {isCollapsed && <span>School Activities</span>}
            </div>
          </Link>
        </li>

        <li className="nav-item menu-item">
          <Link className="nav-link" to="/fees-summary">
            <i className="bi bi-wallet2 menu-icon"></i>
            {!isCollapsed && <span className="menu-title">Fee Summary</span>}
            <div className="submenu">
              {isCollapsed && <span>Fee Summary</span>}
            </div>
          </Link>
        </li>

        <li className="nav-item menu-item">
          <Link className="nav-link" to="/notifications">
            <i className="bi bi-bell menu-icon"></i>
            {!isCollapsed && <span className="menu-title">Notifications</span>}
            <div className="submenu">
              {isCollapsed && <span>Notifications</span>}
            </div>
          </Link>
        </li>

        <li className="nav-item menu-item">
          <Link className="nav-link" to="/communication-tool">
            <i className="bi bi-chat-dots menu-icon"></i>
            {!isCollapsed && (
              <span className="menu-title">Communication Tool</span>
            )}
            <div className="submenu">
              {isCollapsed && <span>Communication Tool</span>}
            </div>
          </Link>
        </li>

        <li className="nav-item menu-item">
          <Link className="nav-link" to="/time-table">
            <i className="bi bi-clock menu-icon"></i>
            {!isCollapsed && <span className="menu-title">Time Table</span>}
            <div className="submenu">
              {isCollapsed && <span>Time Table</span>}
            </div>
          </Link>
        </li>

        <li className="nav-item menu-item">
          <Link className="nav-link" to="/leave-request">
            <i className="bi bi-envelope-open menu-icon"></i>
            {!isCollapsed && <span className="menu-title">Leave Request</span>}
            <div className="submenu">
              {isCollapsed && <span>Leave Request</span>}
            </div>
          </Link>
        </li>

        <li className="nav-item menu-item">
          <Link className="nav-link" to="/logout">
            <i className="bi bi-box-arrow-right menu-icon"></i>
            {!isCollapsed && <span className="menu-title">Logout</span>}
            <div className="submenu">{isCollapsed && <span>Logout</span>}</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
