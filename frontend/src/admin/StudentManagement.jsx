
import { useMemo, useState } from "react";
import "./StudentManagement.css";

const sampleStudents = [
  {
    id: "STU-001",
    name: "Ayesha Rahman",
    email: "ayesha@gmail.com",
    department: "CSE",
    status: "Active",
  },
  {
    id: "STU-002",
    name: "Tanvir Ahmed",
    email: "tanvir@gmail.com",
    department: "EEE",
    status: "Active",
  },
  {
    id: "STU-003",
    name: "Nusrat Jahan",
    email: "nusrat@gmail.com",
    department: "CSE",
    status: "Inactive",
  },
  {
    id: "STU-004",
    name: "Rakib Hasan",
    email: "rakib@gmail.com",
    department: "BBA",
    status: "Active",
  },
  {
    id: "STU-005",
    name: "Sadia Islam",
    email: "sadia@gmail.com",
    department: "CSE",
    status: "Active",
  },
];

function StudentManagement() {
  const [students] = useState(sampleStudents);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()) ||
        student.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  const activeCount = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveCount = students.length - activeCount;

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
            <p>Active Students</p>
            <h2>{activeCount}</h2>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="student-stat-icon">○</div>
          <div>
            <p>Inactive Students</p>
            <h2>{inactiveCount}</h2>
          </div>
        </div>
      </div>

      <div className="student-table-container">
        <div className="student-table-heading">
          <div>
            <h2>All Students</h2>
            <p>Search and view student information</p>
          </div>

          <div className="student-filters">
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="student-table-scroll">
          <table className="student-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Email Address</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td className="student-name">{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    <td>
                      <span
                        className={`student-status ${
                          student.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
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
                  <td colSpan="6" className="student-empty">
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
            <h2>{selectedStudent.name}</h2>

            <div className="student-detail-list">
              <p>
                <strong>Student ID:</strong> {selectedStudent.id}
              </p>
              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>
              <p>
                <strong>Department:</strong> {selectedStudent.department}
              </p>
              <p>
                <strong>Status:</strong> {selectedStudent.status}
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
