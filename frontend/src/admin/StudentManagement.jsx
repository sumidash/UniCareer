
import { useEffect, useMemo, useState } from "react";
import "./StudentManagement.css";

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const token = localStorage.getItem("unicareerToken");

        if (!token) {
          setError("Admin authentication token not found. Please login again.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/admin/students",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch students.");
        }

        setStudents(data.students || []);
      } catch (err) {
        setError(err.message || "Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const name = student.fullName || "";
      const email = student.email || "";
      const userId = student.userId || "";

      const query = search.toLowerCase();

      return (
        name.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        userId.toLowerCase().includes(query)
      );
    });
  }, [students, search]);

  function formatDate(date) {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="student-management">
      <div className="student-page-heading">
        <div>
          <span className="student-page-tag">ADMINISTRATION PANEL</span>
          <h1>Student Management</h1>
          <p>View and manage registered students.</p>
        </div>

        <div className="student-total-label">
          Total Students: {students.length}
        </div>
      </div>

      <div className="student-stats">
        <div className="student-stat-card">
          <div className="student-stat-icon">👨‍🎓</div>
          <div>
            <p>Total Students</p>
            <h2>{students.length}</h2>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="student-stat-icon">✓</div>
          <div>
            <p>Registered Students</p>
            <h2>{students.length}</h2>
          </div>
        </div>
      </div>

      <div className="student-table-container">
        <div className="student-table-heading">
          <div>
            <h2>All Students</h2>
            <p>Search and view registered student information.</p>
          </div>

          <div className="student-filters">
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="student-table-scroll">
          <table className="student-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Email Address</th>
                <th>Registration Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="student-empty">
                    Loading students...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="student-empty">
                    {error}
                  </td>
                </tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.userId}</td>
                    <td className="student-name">{student.fullName}</td>
                    <td>{student.email}</td>
                    <td>{formatDate(student.createdAt)}</td>
                    <td>
                      <button
                        className="student-view-btn"
                        onClick={() => setSelectedStudent(student)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="student-empty">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStudent && (
        <div
          className="student-modal-overlay"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="student-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="student-modal-close"
              onClick={() => setSelectedStudent(null)}
            >
              ×
            </button>

            <span className="student-page-tag">STUDENT DETAILS</span>

            <h2>{selectedStudent.fullName}</h2>

            <div className="student-detail-list">
              <p>
                <strong>Student ID:</strong> {selectedStudent.userId}
              </p>

              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>

              <p>
                <strong>Role:</strong> {selectedStudent.role}
              </p>

              <p>
                <strong>Registered:</strong>{" "}
                {formatDate(selectedStudent.createdAt)}
              </p>
            </div>

            <button
              className="student-close-btn"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentManagement;
