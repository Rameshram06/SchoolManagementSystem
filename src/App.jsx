import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SchoolActivities from "./components/SchoolActivities";
import Dashboard from "./components/Dashboard";
import Assignments from "./components/Assignments";
import Attendance from "./components/Attendance";
import FeesSummary from "./components/FeesSummary";
import MarksReport from "./components/MarksReport";
import Notifications from "./components/Notifications";
import LeaveRequest from "./components/LeaveRequest";
import CommunicationTool from "./components/CommunicationTool";
import MessagesDashboard from "./components/MessagesDashboard";
import TimeTable from "./components/TimeTable";
import MyChild from "./components/MyChild";
import "./App.css";

const App = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Navbar at the top */}
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="main-container">
          {/* Sidebar on the left */}
          <Sidebar isCollapsed={isSidebarCollapsed} />

          {/* Content area for routing */}
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/school-activities" element={<SchoolActivities />} />
              {/* Add additional routes here as needed */}
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/fees-summary" element={<FeesSummary />} />
              <Route path="/marks-report" element={<MarksReport />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/leave-request" element={<LeaveRequest />} />
              <Route
                path="/communication-tool"
                element={<CommunicationTool />}
              />
              <Route
                path="/messages-dashboard/:selectedClass/:selectedSubject"
                element={<MessagesDashboard />}
              />
              <Route path="/time-table" element={<TimeTable />} />
              <Route path="/my-child/:childId" element={<MyChild />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
