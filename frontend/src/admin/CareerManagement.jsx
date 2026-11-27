
import { useEffect, useMemo, useState } from "react";
import "./CareerManagement.css";

function CareerManagement() {
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    skills: "",
    averageSalary: "",
    demand: "Medium",
  });

  const token = localStorage.getItem("unicareerToken");

  async function fetchCareers() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/admin/careers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch careers.");
      }

      setCareers(data.careers || []);
    } catch (err) {
      setError(err.message || "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCareers();
  }, []);

  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      const matchesSearch =
        career.title.toLowerCase().includes(search.toLowerCase()) ||
        career.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        career.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [careers, search, categoryFilter]);

  const categories = [
    ...new Set(careers.map((career) => career.category)),
  ];

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleAddCareer(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (
      !formData.title.trim() ||
      !formData.category.trim() ||
      !formData.description.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "http://localhost:5000/api/admin/careers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title.trim(),
            category: formData.category.trim(),
            description: formData.description.trim(),
            requiredSkills: formData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),
            averageSalary: formData.averageSalary.trim() || "Not specified",
            demand: formData.demand,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add career.");
      }

      setCareers((previous) => [data.career, ...previous]);

      setFormData({
        title: "",
        category: "",
        description: "",
        skills: "",
        averageSalary: "",
        demand: "Medium",
      });

      setShowForm(false);
      setMessage("Career added successfully.");
    } catch (err) {
      setError(err.message || "Unable to add career.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteCareer(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this career?"
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/careers/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete career.");
      }

      setCareers((previous) =>
        previous.filter((career) => career._id !== id)
      );

      setSelectedCareer(null);
      setMessage("Career deleted successfully.");
    } catch (err) {
      setError(err.message || "Unable to delete career.");
    }
  }

  return (
    <div className="career-management">
      <div className="career-page-heading">
        <div>
          <span className="career-page-tag">
            ADMINISTRATION PANEL
          </span>
          <h1>Career Management</h1>
          <p>Manage career opportunities and required skills.</p>
        </div>

        <button
          className="career-add-btn"
          onClick={() => {
            setError("");
            setMessage("");
            setShowForm(true);
          }}
        >
          + Add New Career
        </button>
      </div>

      <div className="career-stats">
        <div className="career-stat-card">
          <div className="career-stat-icon">💼</div>
          <div>
            <p>Total Careers</p>
            <h2>{careers.length}</h2>
          </div>
        </div>

        <div className="career-stat-card">
          <div className="career-stat-icon">📂</div>
          <div>
            <p>Categories</p>
            <h2>{categories.length}</h2>
          </div>
        </div>

        <div className="career-stat-card">
          <div className="career-stat-icon">✓</div>
          <div>
            <p>Available Careers</p>
            <h2>{careers.length}</h2>
          </div>
        </div>
      </div>

      {error && <p className="form-message">{error}</p>}
      {message && <p>{message}</p>}

      <div className="career-content">
        <div className="career-content-heading">
          <div>
            <h2>All Careers</h2>
            <p>Search and manage career information.</p>
          </div>

          <div className="career-filters">
            <input
              type="text"
              placeholder="Search careers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="career-table-scroll">
          <table className="career-table">
            <thead>
              <tr>
                <th>Career Title</th>
                <th>Category</th>
                <th>Required Skills</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="career-empty">
                    Loading careers...
                  </td>
                </tr>
              ) : filteredCareers.length > 0 ? (
                filteredCareers.map((career) => (
                  <tr key={career._id}>
                    <td className="career-title">
                      {career.title}
                    </td>

                    <td>
                      <span className="career-category">
                        {career.category}
                      </span>
                    </td>

                    <td>
                      {(career.requiredSkills || [])
                        .slice(0, 3)
                        .join(", ")}
                      {(career.requiredSkills || []).length > 3 && "..."}
                    </td>

                    <td>
                      <button
                        className="career-view-btn"
                        onClick={() => setSelectedCareer(career)}
                      >
                        View
                      </button>

                      <button
                        className="career-delete-btn"
                        onClick={() => handleDeleteCareer(career._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="career-empty">
                    {error ? error : "No careers found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="career-modal-overlay">
          <div className="career-modal">
            <button
              className="career-modal-close"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <h2>Add New Career</h2>
            <p>Enter the career information below.</p>

            <form onSubmit={handleAddCareer}>
              <label>Career Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Software Engineer"
                value={formData.title}
                onChange={handleFormChange}
                required
              />

              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g. Software Development"
                value={formData.category}
                onChange={handleFormChange}
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter career description..."
                value={formData.description}
                onChange={handleFormChange}
                rows="3"
                required
              />

              <label>Required Skills</label>
              <input
                type="text"
                name="skills"
                placeholder="Python, Java, SQL (comma separated)"
                value={formData.skills}
                onChange={handleFormChange}
              />

              <label>Average Salary</label>
              <input
                type="text"
                name="averageSalary"
                placeholder="e.g. $50,000 - $80,000"
                value={formData.averageSalary}
                onChange={handleFormChange}
              />

              <label>Career Demand</label>
              <select
                name="demand"
                value={formData.demand}
                onChange={handleFormChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <button
                type="submit"
                className="career-submit-btn"
                disabled={saving}
              >
                {saving ? "Adding..." : "Add Career"}
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedCareer && (
        <div
          className="career-modal-overlay"
          onClick={() => setSelectedCareer(null)}
        >
          <div
            className="career-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="career-modal-close"
              onClick={() => setSelectedCareer(null)}
            >
              ×
            </button>

            <span className="career-page-tag">
              CAREER DETAILS
            </span>

            <h2>{selectedCareer.title}</h2>

            <p className="career-detail-category">
              {selectedCareer.category}
            </p>

            <p className="career-detail-description">
              {selectedCareer.description || "No description available."}
            </p>

            <h3>Required Skills</h3>

            <div className="career-skill-list">
              {(selectedCareer.requiredSkills || []).map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>

            <h3>Average Salary</h3>
            <p>{selectedCareer.averageSalary || "Not specified"}</p>

            <h3>Career Demand</h3>
            <p>{selectedCareer.demand || "Medium"}</p>

            <button
              className="career-submit-btn"
              onClick={() => setSelectedCareer(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerManagement;
