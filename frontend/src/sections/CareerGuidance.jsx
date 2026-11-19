import { useEffect, useMemo, useState } from "react";
import "./CareerGuidance.css";

const careerData = [
  {
    title: "Frontend Developer",
    category: "Web Development",
    description: "Build responsive and interactive websites and user interfaces.",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Git"],
    relatedInterests: ["web development", "frontend", "design", "website"],
    goalKeywords: ["frontend", "web developer", "web development"]
  },
  {
    title: "Backend Developer",
    category: "Software Development",
    description: "Develop server-side applications, APIs and database systems.",
    requiredSkills: ["Java", "Python", "SQL", "Database", "API", "Git"],
    relatedInterests: ["backend", "software development", "database", "programming"],
    goalKeywords: ["backend", "software engineer", "backend developer"]
  },
  {
    title: "Full Stack Developer",
    category: "Web Development",
    description: "Work with both frontend and backend technologies.",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "Git"],
    relatedInterests: ["web development", "full stack", "frontend", "backend"],
    goalKeywords: ["full stack", "fullstack"]
  },
  {
    title: "Data Analyst",
    category: "Data Science",
    description: "Analyze data and create useful insights for decision-making.",
    requiredSkills: ["Python", "SQL", "Excel", "Statistics", "Data Visualization"],
    relatedInterests: ["data analysis", "statistics", "data science", "research"],
    goalKeywords: ["data analyst", "data analysis"]
  },
  {
    title: "Machine Learning Engineer",
    category: "Artificial Intelligence",
    description: "Build and evaluate machine learning models and intelligent systems.",
    requiredSkills: ["Python", "Mathematics", "Statistics", "Machine Learning", "SQL"],
    relatedInterests: ["artificial intelligence", "machine learning", "data science", "research"],
    goalKeywords: ["machine learning", "ai engineer", "artificial intelligence"]
  },
  {
    title: "UI/UX Designer",
    category: "Design",
    description: "Design user-friendly digital products and improve user experiences.",
    requiredSkills: ["UI Design", "UX Design", "Figma", "Prototyping", "Communication"],
    relatedInterests: ["design", "ui", "ux", "creative design"],
    goalKeywords: ["ui designer", "ux designer", "ui ux"]
  },
  {
    title: "Software Engineer",
    category: "Software Development",
    description: "Design, develop, test and maintain software applications.",
    requiredSkills: ["Programming", "Java", "Python", "Data Structures", "OOP", "Git"],
    relatedInterests: ["programming", "software development", "problem solving"],
    goalKeywords: ["software engineer", "software developer"]
  }
];

const normalize = (value) => String(value || "").trim().toLowerCase();

function getSkillLevel(level) {
  const value = normalize(level);

  if (value === "advanced") return 3;
  if (value === "intermediate") return 2;
  if (value === "beginner") return 1;

  return 0;
}

function getCareerAnalysis(career, skills, interests, careerGoal) {
  const normalizedSkills = skills.map((skill) => ({
    name: normalize(skill.skillName),
    level: getSkillLevel(skill.level)
  }));

  const matchedSkills = career.requiredSkills.filter((requiredSkill) =>
    normalizedSkills.some((skill) =>
      skill.name.includes(normalize(requiredSkill)) ||
      normalize(requiredSkill).includes(skill.name)
    )
  );

  const missingSkills = career.requiredSkills.filter((requiredSkill) =>
    !matchedSkills.includes(requiredSkill)
  );

  const interestMatches = career.relatedInterests.filter((interest) =>
    interests.some((item) =>
      normalize(item).includes(normalize(interest)) ||
      normalize(interest).includes(normalize(item))
    )
  );

  const goalMatch = career.goalKeywords.some((keyword) =>
    normalize(careerGoal).includes(normalize(keyword))
  );

  const skillScore =
    career.requiredSkills.length > 0
      ? (matchedSkills.length / career.requiredSkills.length) * 70
      : 0;

  const interestScore =
    career.relatedInterests.length > 0
      ? (interestMatches.length / career.relatedInterests.length) * 20
      : 0;

  const goalScore = goalMatch ? 10 : 0;

  const matchScore = Math.min(
    100,
    Math.round(skillScore + interestScore + goalScore)
  );

  return {
    ...career,
    matchedSkills,
    missingSkills,
    interestMatches,
    matchScore,
    goalMatch
  };
}

function CareerGuidance({ currentUser }) {
  const userId = currentUser?.userId || "unknown";

  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(
        `unicareerProfile_${userId}`
      );

      const savedSkills = localStorage.getItem(
        `unicareerSkills_${userId}`
      );

      setProfile(savedProfile ? JSON.parse(savedProfile) : {});
      setSkills(savedSkills ? JSON.parse(savedSkills) : []);
    } catch {
      setProfile({});
      setSkills([]);
    }
  }, [userId]);

  const analysis = useMemo(() => {
    const interests = String(profile.interests || "")
      .split(/[,;]+/)
      .map((item) => item.trim())
      .filter(Boolean);

    return careerData
      .map((career) =>
        getCareerAnalysis(
          career,
          Array.isArray(skills) ? skills : [],
          interests,
          profile.careerGoal || ""
        )
      )
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [profile, skills]);

  const recommendations = showAll ? analysis : analysis.slice(0, 4);

  return (
    <section className="career-guidance">
      <div className="career-guidance-header">
        <div>
          <span className="career-eyebrow">AI CAREER ASSISTANT</span>
          <h1>Discover Your Career Path</h1>
          <p>
            Explore career paths based on your profile, interests and current skills.
          </p>
        </div>
      </div>

      <div className="career-overview-cards">
        <div className="career-overview-card">
          <span>Total Skills</span>
          <strong>{skills.length}</strong>
        </div>

        <div className="career-overview-card">
          <span>Career Paths Analyzed</span>
          <strong>{analysis.length}</strong>
        </div>

        <div className="career-overview-card">
          <span>Profile Status</span>
          <strong>
            {profile.department && profile.careerGoal ? "Ready" : "Incomplete"}
          </strong>
        </div>
      </div>

      {(!profile.department || !profile.careerGoal || skills.length === 0) && (
        <div className="career-notice">
          <h3>Complete Your Student Information</h3>
          <p>
            For more relevant recommendations, complete your profile, add your
            career goal and enter your skills in the My Skills section.
          </p>
        </div>
      )}

      <div className="career-recommendation-heading">
        <div>
          <h2>Recommended Career Paths</h2>
          <p>Ranked using your current skills, interests and career goal.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowAll((previous) => !previous)}
          className="career-view-button"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="career-recommendation-list">
        {recommendations.map((career) => (
          <article className="career-recommendation-card" key={career.title}>
            <div className="career-card-top">
              <div>
                <span className="career-category">{career.category}</span>
                <h3>{career.title}</h3>
              </div>

              <div className="career-match">
                <strong>{career.matchScore}%</strong>
                <span>Match</span>
              </div>
            </div>

            <p className="career-description">{career.description}</p>

            <div className="career-match-progress">
              <div style={{ width: `${career.matchScore}%` }} />
            </div>

            <div className="career-skill-section">
              <h4>Matched Skills ({career.matchedSkills.length})</h4>

              <div className="career-skill-tags">
                {career.matchedSkills.length > 0 ? (
                  career.matchedSkills.map((skill) => (
                    <span className="matched-tag" key={skill}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="career-empty-text">
                    No matching skills yet
                  </span>
                )}
              </div>
            </div>

            <div className="career-skill-section">
              <h4>Skills to Learn ({career.missingSkills.length})</h4>

              <div className="career-skill-tags">
                {career.missingSkills.map((skill) => (
                  <span className="missing-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="career-card-footer">
              <span>
                {career.goalMatch
                  ? "Matches your career goal"
                  : "Explore this career path"}
              </span>
              <span>{career.interestMatches.length} interest matches</span>
            </div>
          </article>
        ))}
      </div>

      <div className="career-disclaimer">
        <strong>How this analysis works</strong>
        <p>
          These recommendations are calculated from a predefined career-skill
          dataset and your saved profile information. Match percentages are
          indicative scores, not guaranteed job eligibility or employment
          predictions.
        </p>
      </div>
    </section>
  );
}

export default CareerGuidance;