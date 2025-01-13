import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MessagesDashboard = () => {
  const { selectedClass, selectedSubject } = useParams();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [chatTitle, setChatTitle] = useState("");
  const [messagesHistory, setMessagesHistory] = useState({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [notifications, setNotifications] = useState({});
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isMessageFailed, setIsMessageFailed] = useState(false);

  const teachersBySubject = {
    Science: ["Mr. Adams", "Ms. Eve"],
    Math: ["Mr. Smith", "Mrs. Brown"],
    English: ["Mr. Johnson", "Ms. Lee"],
    Social: ["Mr. Clark", "Ms. Green"],
    Kannada: ["Mr. Jonney", "Ms. Queen"],
    Hindi: ["Mr. Yarny", "Ms. Honey"],
    Sanskrit: ["Mr. Indo", "Ms. Manii"],
  };

  const teachers = teachersBySubject[selectedSubject] || [];

  // Load messages from localStorage when the component mounts
  useEffect(() => {
    if (!selectedClass || !selectedSubject) {
      console.error("Missing class or subject parameters!");
    }

    // Load the stored messages from localStorage for this class and subject
    const storedMessages = localStorage.getItem(
      `messages_${selectedClass}_${selectedSubject}`
    );
    if (storedMessages) {
      setMessagesHistory(JSON.parse(storedMessages));
    }
  }, [selectedClass, selectedSubject]);

  const startChat = (teacher) => {
    setIsChatOpen(true);
    setSelectedTeacher(teacher);
    setChatTitle(teacher);
    if (!messagesHistory[teacher]) {
      setMessagesHistory((prevHistory) => ({
        ...prevHistory,
        [teacher]: [],
      }));
    }
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [teacher]: false,
    }));
  };

  const sendMessage = () => {
    if (currentMessage.trim() && selectedTeacher) {
      //Simulate success
      setTimeout(() => {
        const randomFailure = Math.random() < 0.2; // 20% chance of failure for demo
        if (randomFailure) {
          setIsMessageFailed(true);
          setTimeout(() => {
            setIsMessageFailed(false);
          }, 3000);
          return;
        }
        const date = new Date();
        const timestamp = `${date.getHours()}:${date.getMinutes()} - ${date.toLocaleDateString()}`;
        const newMessage = { message: currentMessage, time: timestamp };
        setMessagesHistory((prevHistory) => {
          const updatedHistory = { ...prevHistory };
          updatedHistory[selectedTeacher] = [
            ...updatedHistory[selectedTeacher],
            newMessage,
          ];
          localStorage.setItem(
            `messages_${selectedClass}_${selectedSubject}`,
            JSON.stringify(updatedHistory)
          );
          return updatedHistory;
        });
        setCurrentMessage("");
        setIsMessageSent(true);
      }, 1000); // Simulated API time of 1 second
    }
  };

  const deleteMessage = (teacher, index) => {
    setMessagesHistory((prevHistory) => {
      const updatedHistory = { ...prevHistory };
      if (updatedHistory[teacher]) {
        // Check if the teacher has a messages array
        updatedHistory[teacher] = updatedHistory[teacher].filter(
          (_, i) => i !== index
        ); //Filter out the index you want to remove.
      }
      localStorage.setItem(
        `messages_${selectedClass}_${selectedSubject}`,
        JSON.stringify(updatedHistory)
      );
      return updatedHistory;
    });
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedTeacher("");
    setChatTitle("");
  };
  const handleContinue = () => {
    setIsMessageSent(false);
    setIsMessageFailed(false);
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

  const cardStyle = {
    maxWidth: "500px",
    width: "100%",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    fontSize: "0.9rem",
  };

  const historyStyle = {
    height: "150px",
    overflowY: "scroll",
    fontSize: "0.8rem",
  };
  const headingStyle = {
    fontSize: "1.3rem",
    fontWeight: "bold",
  };
  const popupOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const popupStyle = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
    minWidth: "400px",
    textAlign: "center",
    fontSize: "1.1rem",
  };
  const successTextStyle = {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "5px",
  };
  const successPopupTextStyle = {
    fontSize: "1rem",
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
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "aliceblue",
        padding: "20px",
      }}
    >
      {/* Main Content without Sidebar */}
      <div className="card shadow-lg" style={cardStyle}>
        <h3 className="text-center" style={headingStyle}>
          Messages - Class {selectedClass} - {selectedSubject}
        </h3>

        {/* Success message popup */}
        {(isMessageSent || isMessageFailed) && (
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
              <div style={swalTitleStyle}>
                {isMessageSent ? "Successful!" : "Failed!"}
              </div>
              <div style={swalTextStyle}>
                {isMessageSent
                  ? "Message sent successfully!"
                  : "Failed to send the message. Please try again!"}
              </div>
              <button onClick={handleContinue} style={buttonStyle}>
                Continue
              </button>
            </div>
          </div>
        )}

        <div className="mt-4">
          <h5 style={{ fontSize: "1rem" }}>
            Select Teacher for {selectedSubject}
          </h5>
          <ul className="list-group">
            {teachers.map((teacher) => (
              <li
                key={teacher}
                className="list-group-item d-flex justify-content-between"
              >
                <span style={{ fontSize: "0.9rem" }}>{teacher}</span>
                <button
                  className="btn btn-primary btn-sm btn-rounded"
                  onClick={() => startChat(teacher)}
                  style={buttonStyle}
                >
                  Message
                </button>
                {notifications[teacher] && (
                  <span className="badge bg-danger ms-2">New</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {isChatOpen && selectedTeacher && (
          <div className="container mt-4">
            <h5 style={{ fontSize: "1rem" }}>Chat with {chatTitle}</h5>
            <h5 style={{ fontSize: "1rem" }}>History</h5>
            <div className="border p-3" style={historyStyle}>
              {messagesHistory[selectedTeacher]?.map((msg, index) => (
                <div
                  key={index}
                  className="message mb-2 d-flex justify-content-between align-items-center"
                  style={{ fontSize: "0.9rem" }}
                >
                  <div>
                    <p>
                      <strong>{msg.message}</strong>
                    </p>
                    <small className="text-muted">{msg.time}</small>
                  </div>
                  <button
                    className="btn btn-danger btn-sm btn-rounded"
                    onClick={() => deleteMessage(selectedTeacher, index)}
                    style={buttonStyle}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <p style={{ fontSize: "0.9rem" }}>Write here</p>
              <textarea
                className="form-control"
                rows="3"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                style={{ fontSize: "0.9rem" }}
              ></textarea>
            </div>

            <div className="mt-3 d-flex justify-content-between">
              <button
                className="btn btn-primary btn-rounded"
                onClick={sendMessage}
                disabled={!currentMessage.trim()}
                style={buttonStyle}
              >
                Send
              </button>
              <button
                className="btn btn-secondary btn-rounded"
                onClick={closeChat}
                style={buttonStyle}
              >
                Back
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <Link
            to="/parent-dashboard"
            className="btn btn-secondary btn-rounded"
            style={buttonStyle}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MessagesDashboard;
