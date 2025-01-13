import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Assignments = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(null); // Track selected child
  const [assignments, setAssignments] = useState([]);

  // Dummy data for assignments
  const assignmentsData = [
    {
      id: 1,
      subject_name: 'Mathematics',
      assignment_name: 'Algebra Homework',
      teacher_name: 'Mr. Smith',
      date_given: '2024-11-01',
      date_completed: '2024-11-05',
      status: 'completed',
      class: '10',
      rollNumber: '22',
      student_name: 'John Doe',
    },
    {
      id: 2,
      subject_name: 'Science',
      assignment_name: 'Physics Project',
      teacher_name: 'Mrs. Johnson',
      date_given: '2024-11-10',
      date_completed: null,
      status: 'pending',
      class: '10',
      rollNumber: '22',
      student_name: 'John Doe',
    },
    {
      id: 3,
      subject_name: 'English',
      assignment_name: 'Essay on Shakespeare',
      teacher_name: 'Ms. Davis',
      date_given: '2024-11-12',
      date_completed: null,
      status: 'pending',
      class: '9',
      rollNumber: '10',
      student_name: 'Jane Smith',
    },
  ];

  // Handle showing assignments based on selected child
  useEffect(() => {
    if (selectedChild) {
      const filteredAssignments = assignmentsData.filter(
        (assignment) => assignment.student_name === selectedChild
      );
      setAssignments(filteredAssignments);
    } else {
      setAssignments([]);
    }
  }, [selectedChild]);

  const handleBack = () => {
    setSelectedChild(null); // Reset selected child
    setAssignments([]); // Clear assignments
    navigate('/parent-dashboard');
  };

  return (
    <div className="container-fluid my-4" style={{ minHeight: '100vh', backgroundColor: 'AliceBlue' }}>
      
      {/* Card for child selection */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-6">
          <div className="card p-4 no-hover-card">
            <h4>Select Your Child Assignment</h4>
            <div className="mb-3">
              <button
                className="btn btn-info me-2"
                onClick={() => setSelectedChild('John Doe')}
                style={{ borderRadius: 50 }}
              >
                John Doe
              </button>
              <button
                className="btn btn-info"
                onClick={() => setSelectedChild('Jane Smith')}
                style={{ borderRadius: 50 }}
              >
                Jane Smith
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card for showing assignments based on selected child */}
      {selectedChild && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card p-4 no-hover-card">
              <h4>{selectedChild} Assignments</h4>

              {/* Show assignments for the selected child */}
              {assignments.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Assignment Name</th>
                        <th>Teacher Name</th>
                        <th>Date Given</th>
                        <th>Date Completed</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignments.map((assignment) => (
                        <tr key={assignment.id}>
                          <td>{assignment.subject_name}</td>
                          <td>{assignment.assignment_name}</td>
                          <td>{assignment.teacher_name}</td>
                          <td>{new Date(assignment.date_given).toLocaleDateString()}</td>
                          <td>
                            {assignment.date_completed
                              ? new Date(assignment.date_completed).toLocaleDateString()
                              : 'N/A'}
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                assignment.status === 'completed' ? 'bg-success' : 'bg-warning'
                              }`}
                            >
                              {assignment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No assignments found for {selectedChild}.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
