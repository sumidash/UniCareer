
import { useMemo, useState } from "react";
import "./CareerManagement.css";

const initialCareers = [
  {
    id: 1,
    title: "Frontend Developer",
    category: "Web Development",
    description: "Build responsive websites and interactive user interfaces.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: 2,
    title: "Backend Developer",
    category: "Software Development",
    description: "Develop server-side applications, APIs and databases.",
    skills: ["Node.js", "Express", "MongoDB", "SQL"],
  },
  {
    id: 3,
    title: "Data Scientist",
    category: "Data Science",
    description: "Analyze data and build predictive machine learning models.",
    skills: ["Python", "Pandas", "Machine Learning", "Statistics"],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    category: "Design",
    description: "Design user-friendly and attractive digital experiences.",
    skills: ["Figma", "Wireframing", "Prototyping", "Design"],
  },
  {
    id: 5,
    title: "AI Engineer",
    category: "Artificial Intelligence",
    description: "Build intelligent systems using AI and machine learning.",
    skills: ["Python", "TensorFlow", "Machine Learning", "Deep Learning"],
  },
];

function CareerManagement() {
  const [careers, setCareers] = useState(initialCareers);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    skills: "",
  });

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

  function handleAddCareer(e) {
    e.preventDefault();

    const newCareer = {
      id: Date.now(),
      title: formData.title.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    if (!newCareer.title || !newCareer.category) return;

    setCareers((prev) => [...prev, newCareer]);

    setFormData({
      title: "",
      category: "",
      description: "",
      skills: "",
    });

    setShowForm(false);
  }

  function handleDeleteCareer(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this career?"
    );

    if (!confirmed) return;

    setCareers((prev) =>
      prev.filter((career) => career.id !== id)
    );

    setSelectedCareer(null);
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
          onClick={() => setShowForm(true)}
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
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
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
              {filteredCareers.length > 0 ? (
                filteredCareers.map((career) => (
                  <tr key={career.id}>
                    <td className="career-title">
                      {career.title}
                    </td>

                    <td>
                      <span className="career-category">
                        {career.category}
                      </span>
                    </td>

                    <td>
                      {career.skills.slice(0, 3).join(", ")}
                      {career.skills.length > 3 && "..."}
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
                        onClick={() =>
                          handleDeleteCareer(career.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="career-empty">
                    No careers found.
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
                placeholder="e.g. Software Engineer"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                required
              />

              <label>Category</label>
              <input
                type="text"
                placeholder="e.g. Software Development"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                required
              />

              <label>Description</label>
              <textarea
                placeholder="Enter career description..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                rows="3"
              />

              <label>Required Skills</label>
              <input
                type="text"
                placeholder="Python, Java, SQL (comma separated)"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: e.target.value,
                  })
                }
              />

              <button type="submit" className="career-submit-btn">
                Add Career
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
              {selectedCareer.skills.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>

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
