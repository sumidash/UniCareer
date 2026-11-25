
import { useState, useEffect } from "react";
import "./SkillGapAnalysis.css";

function SkillGapAnalysis({ currentUser }) {
  const userId = currentUser?.userId || "unknown";
  const storageKey = `unicareerSkills_${userId}`;

  const [mySkills, setMySkills] = useState([]);
  const [career, setCareer] = useState("Software Developer");

  const careerSkills = {
    "Software Developer": [
      "Java", "C", "C++", "Python",
      "JavaScript", "Data Structures", "SQL", "Git"
    ],
    "Web Developer": [
      "HTML", "CSS", "JavaScript", "React",
      "Node.js", "SQL", "Git"
    ],
    "Data Analyst": [
      "Python", "SQL", "Excel",
      "Statistics", "Power BI"
    ],
    "AI/ML Engineer": [
      "Python", "Mathematics", "Statistics",
      "Machine Learning", "Data Structures", "SQL"
    ]
  };

  const levelPercentage = {
    Beginner: 30,
    Intermediate: 65,
    Advanced: 90
  };

  useEffect(() => {
    function loadSkills() {
      try {
        const saved = localStorage.getItem(storageKey);
        const parsed = saved ? JSON.parse(saved) : [];
        setMySkills(Array.isArray(parsed) ? parsed : []);
      } catch {
        setMySkills([]);
      }
    }

    loadSkills();

    window.addEventListener("unicareerSkillsUpdated", loadSkills);

    return () => {
      window.removeEventListener("unicareerSkillsUpdated", loadSkills);
    };
  }, [storageKey]);

  function findSkill(skillName) {
    return mySkills.find(
      skill =>
        skill.skillName?.trim().toLowerCase() ===
        skillName.trim().toLowerCase()
    );
  }

  const requiredSkills = careerSkills[career];

  const matchedSkills = requiredSkills.filter(
    skill => findSkill(skill)
  );

  const missingSkills = requiredSkills.filter(
    skill => !findSkill(skill)
  );

  const progress = Math.round(
    (matchedSkills.length / requiredSkills.length) * 100
  );

  return (
    <div className="skill-page" id="skills">
      <div className="skill-header">
        <div>
          <p className="skill-subtitle">CAREER DEVELOPMENT</p>
          <h1>Skill Gap Analysis</h1>
          <p>
            Discover your missing skills and improve your career readiness.
          </p>
        </div>

        <div className="skill-icon">✦</div>
      </div>

      <div className="skill-career-select">
        <label htmlFor="career">Select Your Career</label>

        <select
          id="career"
          value={career}
          onChange={e => setCareer(e.target.value)}
        >
          {Object.keys(careerSkills).map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="skill-stats">
        <div className="skill-stat-card">
          <span>Required Skills</span>
          <h2>{requiredSkills.length}</h2>
          <p>Skills for this career</p>
        </div>

        <div className="skill-stat-card">
          <span>Skills You Have</span>
          <h2>{matchedSkills.length}</h2>
          <p>Skills already added</p>
        </div>

        <div className="skill-stat-card">
          <span>Missing Skills</span>
          <h2>{missingSkills.length}</h2>
          <p>Skills to learn</p>
        </div>
      </div>

      <div className="skill-content">
        <div className="skill-list">
          <h2>Your Skill Overview</h2>
          <p>Compare your skills with career requirements.</p>

          {requiredSkills.map(skillName => {
            const skill = findSkill(skillName);

            const percentage = skill
              ? levelPercentage[skill.level] || 30
              : 0;

            return (
              <div className="skill-item" key={skillName}>
                <div className="skill-info">
                  <h3>{skillName}</h3>

                  <span>
                    {skill
                      ? `${skill.level} - ${percentage}%`
                      : "Not Added"}
                  </span>
                </div>

                <div className="skill-progress">
                  <div
                    className="skill-progress-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <p className="skill-gap-text">
                  {skill
                    ? `You have this skill (${skill.level})`
                    : "Missing skill - You need to learn this"}
                </p>
              </div>
            );
          })}
        </div>

        <div className="skill-tips">
          <div className="tips-icon">✦</div>

          <h2>Skill Gap Summary</h2>
          <p>Your current skill coverage for {career}.</p>

          <h3>{progress}% Skill Coverage</h3>

          <div className="skill-progress">
            <div
              className="skill-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <h3>Recommended Skills to Learn</h3>

          {missingSkills.length > 0 ? (
            <ul>
              {missingSkills.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>You have all the required skills for this career!</p>
          )}
        </div>
      </div>

      {mySkills.length === 0 && (
        <p className="skill-gap-text">
          No skills found. Please add your skills in My Skills first.
        </p>
      )}
    </div>
  );
}

export default SkillGapAnalysis;
