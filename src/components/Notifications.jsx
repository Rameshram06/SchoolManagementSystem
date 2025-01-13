import React, { useState } from "react";
import "./Notifications.css";

const Notifications = () => {
  // Mock data for notifications
  const initialNotifications = [
    {
      id: 1,
      title: "Holiday Notice",
      description: "The school will remain closed on January 1, 2025.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      description: "A PTM is scheduled for January 11, 2025.",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "Fee Payment Reminder",
      description: "The last date for fee submission is January 25, 2025.",
      time: "3 days ago",
      read: true,
    },
    {
      id: 4,
      title: "Exam Schedule",
      description: "The mid-term exam schedule is now available.",
      time: "5 days ago",
      read: true,
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  // Style for spacing and centering notification content
  const notificationPageStyle = {
    backgroundColor: "aliceblue",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  // Style for the notification container
  const notificationContainerStyle = {
    maxWidth: "800px",
    width: "100%",
  };

  const handleNotificationClick = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="notification-page" style={notificationPageStyle}>
      <div className="container p-3" style={notificationContainerStyle}>
        <div className="card shadow no-hover-card">
          <div className="card-header d-flex justify-content-between">
            <h4 className="card-title">Notifications</h4>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`list-group-item ${
                    notification.read ? "bg-light" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <h5 className="fw-bold mb-1">{notification.title}</h5>
                      <p className="mb-1 text-muted">
                        {notification.description}
                      </p>
                      <small className="text-secondary">
                        {notification.time}
                      </small>
                    </div>
                    {!notification.read && (
                      <span className="badge bg-primary rounded-pill">New</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
