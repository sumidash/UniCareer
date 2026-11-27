
import { useState } from "react";
import "./SkillsManagement.css";

function SkillsManagement() {
  const [skills, setSkills] = useState([
    { id: 1, name: "JavaScript", category: "Programming", level: "Advanced" },
    { id: 2, name: "React", category: "Web Development", level: "Intermediate" },
    { id: 3, name: "Python", category: "Programming", level: "Beginner" },
    { id: 4, name: "Database Management", category: "Database", level: "Intermediate" },
  ]);

  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Beginner");

  const handleAddSkill = (e) => {
    e.preventDefault();

    if (!skillName.trim() || !category.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newSkill = {
      id: Date.now(),
      name: skillName.trim(),
      category: category.trim(),
      level,
    };

    setSkills([...skills, newSkill]);
    setSkillName("");
    setCategory("");
    setLevel("Beginner");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      setSkills(skills.filter((skill) => skill.id !== id));
    }
  };

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
              />
            </div>

            <div className="skills-input-group">
              <label>Category</label>
              <input
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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

            <button type="submit" className="skills-add-btn">
              + Add Skill
            </button>
          </form>
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
                  <th>Level</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {skills.map((skill, index) => (
                  <tr key={skill.id}>
                    <td>{index + 1}</td>
                    <td>{skill.name}</td>
                    <td>{skill.category}</td>
                    <td>
                      <span className={`skill-level ${skill.level.toLowerCase()}`}>
                        {skill.level}
                      </span>
                    </td>
                    <td>
                      <button
                        className="skills-delete-btn"
                        onClick={() => handleDelete(skill.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {skills.length === 0 && (
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
