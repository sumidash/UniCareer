
import { useEffect, useState } from "react";
import "./SkillsManagement.css";

function SkillsManagement() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("unicareerToken");

  async function fetchSkills() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/admin/skills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch skills.");
      }

      setSkills(data.skills || []);
    } catch (err) {
      setError(err.message || "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSkills();
  }, []);

  async function handleAddSkill(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!skillName.trim() || !category.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("http://localhost:5000/api/admin/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: skillName.trim(),
          category: category.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add skill.");
      }

      setSkills((previousSkills) => [data.skill, ...previousSkills]);
      setSkillName("");
      setCategory("");
      setLevel("Beginner");
      setDescription("");
      setMessage("Skill added successfully.");
    } catch (err) {
      setError(err.message || "Unable to add skill.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/skills/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete skill.");
      }

      setSkills((previousSkills) =>
        previousSkills.filter((skill) => skill._id !== id)
      );
      setMessage("Skill deleted successfully.");
    } catch (err) {
      setError(err.message || "Unable to delete skill.");
    }
  }

  return (
    <div className="skills-management">
      <div className="skills-header">
        <div>
          <h1>Skills Management</h1>
          <p>Manage and organize student skills.</p>
        </div>

        <div className="skills-total">
          <span>Total Skills</span>
          <h2>{skills.length}</h2>
        </div>
      </div>

      <div className="skills-content">
        <div className="skills-form-card">
          <h2>Add New Skill</h2>

          <form onSubmit={handleAddSkill}>
            <div className="skills-input-group">
              <label>Skill Name</label>
              <input
                type="text"
                placeholder="Enter skill name"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                required
              />
            </div>

            <div className="skills-input-group">
              <label>Category</label>
              <input
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="skills-input-group">
              <label>Skill Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="skills-input-group">
              <label>Description</label>
              <input
                type="text"
                placeholder="Enter description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="skills-add-btn" disabled={saving}>
              {saving ? "Adding..." : "+ Add Skill"}
            </button>
          </form>

          {error && <p className="form-message">{error}</p>}
          {message && <p>{message}</p>}
        </div>

        <div className="skills-table-card">
          <h2>All Skills</h2>

          <div className="skills-table-wrapper">
            <table className="skills-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Skill Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="skills-empty">
                      Loading skills...
                    </td>
                  </tr>
                ) : error && skills.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="skills-empty">
                      {error}
                    </td>
                  </tr>
                ) : skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <tr key={skill._id}>
                      <td>{index + 1}</td>
                      <td>{skill.name}</td>
                      <td>{skill.category}</td>
                      <td>{skill.description || "—"}</td>
                      <td>
                        <button
                          className="skills-delete-btn"
                          onClick={() => handleDelete(skill._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="skills-empty">
                      No skills available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsManagement;
