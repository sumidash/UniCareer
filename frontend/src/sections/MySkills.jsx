import { useState } from "react";
import "./MySkills.css";

function MySkills({ currentUser }) {
  const userId = currentUser?.userId || "unknown";
  const storageKey = `unicareerSkills_${userId}`;

  const [skills, setSkills] = useState(() => {
    try {
      const savedSkills = localStorage.getItem(storageKey);
      return savedSkills ? JSON.parse(savedSkills) : [];
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState({
    skillName: "",
    category: "Programming",
    level: "Beginner",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const levelPercentage = {
    Beginner: 30,
    Intermediate: 65,
    Advanced: 90,
  };

  const categories = [
    "Programming",
    "Web Development",
    "Database",
    "Design",
    "Soft Skills",
    "Other",
  ];

  function saveSkills(updatedSkills) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(updatedSkills));
    setSkills(updatedSkills);

    window.dispatchEvent(new Event("unicareerSkillsUpdated"));

    return true;
  } catch {
    setMessage("Unable to save skills. Please try again.");
    return false;
  }
}

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const skillName = formData.skillName.trim();

    if (!skillName) {
      setMessage("Please enter a skill name.");
      return;
    }

    const duplicate = skills.some(
      (skill) =>
        skill.skillName.toLowerCase() === skillName.toLowerCase() &&
        skill.id !== editingId
    );

    if (duplicate) {
      setMessage("This skill has already been added.");
      return;
    }

    let updatedSkills;

    if (editingId !== null) {
      updatedSkills = skills.map((skill) =>
        skill.id === editingId
          ? { ...skill, ...formData, skillName }
          : skill
      );
    } else {
      const newSkill = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        ...formData,
        skillName,
      };

      updatedSkills = [...skills, newSkill];
    }

    if (saveSkills(updatedSkills)) {
      setFormData({
        skillName: "",
        category: "Programming",
        level: "Beginner",
      });

      setEditingId(null);
      setMessage(
        editingId !== null
          ? "Skill updated successfully!"
          : "Skill added successfully!"
      );
    }
  }

  function handleEdit(skill) {
    setFormData({
      skillName: skill.skillName,
      category: skill.category,
      level: skill.level,
    });

    setEditingId(skill.id);
    setMessage("");
  }

  function handleDelete(id) {
    const updatedSkills = skills.filter((skill) => skill.id !== id);

    if (saveSkills(updatedSkills)) {
      if (editingId === id) {
        handleCancel();
      }

      setMessage("Skill deleted successfully!");
    }
  }

  function handleCancel() {
    setFormData({
      skillName: "",
      category: "Programming",
      level: "Beginner",
    });

    setEditingId(null);
    setMessage("");
  }

  return (
    <div className="my-skills-page">
      <div className="skills-page-intro">
        <span className="skills-page-tag">SKILLS MANAGEMENT</span>
        <h2>My Skills</h2>
        <p>
          Add your skills and track your current proficiency levels.
        </p>
      </div>

      <div className="skills-summary">
        <div className="skills-summary-card">
          <span className="summary-icon">⌘</span>
          <div>
            <p>Total Skills</p>
            <h3>{skills.length.toString().padStart(2, "0")}</h3>
          </div>
        </div>

        <div className="skills-summary-card">
          <span className="summary-icon">✧</span>
          <div>
            <p>Advanced Skills</p>
            <h3>
              {skills.filter((skill) => skill.level === "Advanced").length
                .toString()
                .padStart(2, "0")}
            </h3>
          </div>
        </div>

        <div className="skills-summary-card">
          <span className="summary-icon">◎</span>
          <div>
            <p>Skill Categories</p>
            <h3>{new Set(skills.map((skill) => skill.category)).size
              .toString()
              .padStart(2, "0")}</h3>
          </div>
        </div>
      </div>

      <section className="skills-form-panel">
        <div className="skills-panel-heading">
          <div>
            <h3>{editingId !== null ? "Edit Skill" : "Add New Skill"}</h3>
            <p>Enter your skill information below.</p>
          </div>

          <span className="skills-heading-icon">+</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="skills-form-grid">
            <div className="skills-field">
              <label htmlFor="skillName">Skill Name</label>
              <input
                id="skillName"
                name="skillName"
                value={formData.skillName}
                onChange={handleChange}
                placeholder="e.g. JavaScript"
                required
              />
            </div>

            <div className="skills-field">
              <label htmlFor="category">Skill Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="skills-field">
              <label htmlFor="level">Proficiency Level</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {message && (
            <p className="skills-message" role="status">
              {message}
            </p>
          )}

          <div className="skills-form-actions">
            {editingId !== null && (
              <button
                type="button"
                className="cancel-skill-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}

            <button type="submit" className="add-skill-button">
              {editingId !== null ? "Update Skill" : "Add Skill"}
              <span>→</span>
            </button>
          </div>
        </form>
      </section>

      <section className="skills-list-panel">
        <div className="skills-panel-heading">
          <div>
            <h3>Your Skills</h3>
            <p>Manage your technical and personal skills.</p>
          </div>

          <span className="skills-count">{skills.length} Skills</span>
        </div>

        {skills.length === 0 ? (
          <div className="empty-skills">
            <div className="empty-skills-icon">⌘</div>
            <h3>No Skills Added Yet</h3>
            <p>
              Start by adding your first skill using the form above.
            </p>
          </div>
        ) : (
          <div className="my-skills-list">
            {skills.map((skill) => (
              <div className="my-skill-card" key={skill.id}>
                <div className="my-skill-top">
                  <div className="my-skill-icon">✧</div>

                  <div className="my-skill-details">
                    <h4>{skill.skillName}</h4>
                    <span>{skill.category}</span>
                  </div>

                  <span
                    className={`skill-level-badge ${skill.level.toLowerCase()}`}
                  >
                    {skill.level}
                  </span>
                </div>

                <div className="my-skill-progress-info">
                  <span>Proficiency</span>
                  <span>{levelPercentage[skill.level]}%</span>
                </div>

                <div className="my-skill-progress">
                  <div
                    className="my-skill-progress-fill"
                    style={{
                      width: `${levelPercentage[skill.level]}%`,
                    }}
                  ></div>
                </div>

                <div className="my-skill-actions">
                  <button
                    type="button"
                    onClick={() => handleEdit(skill)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(skill.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MySkills;