
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
  },
  {
    title: "Cybersecurity Analyst",
    category: "Cybersecurity",
    description: "Protect computer systems, networks and data from cyber threats.",
    requiredSkills: ["Networking", "Linux", "Python", "Cybersecurity", "Security Tools"],
    relatedInterests: ["security", "cybersecurity", "networking"],
    goalKeywords: ["cybersecurity", "security analyst"]
  },
  {
    title: "Mobile App Developer",
    category: "Mobile Development",
    description: "Create mobile applications for Android and iOS devices.",
    requiredSkills: ["Java", "Kotlin", "Flutter", "Dart", "Firebase"],
    relatedInterests: ["mobile app", "android", "ios", "app development"],
    goalKeywords: ["mobile developer", "app developer"]
  },
  {
    title: "Cloud Engineer",
    category: "Cloud Computing",
    description: "Build and manage cloud infrastructure and services.",
    requiredSkills: ["AWS", "Azure", "Linux", "Networking", "Docker"],
    relatedInterests: ["cloud", "cloud computing", "devops"],
    goalKeywords: ["cloud engineer", "cloud computing"]
  },
  {
    title: "DevOps Engineer",
    category: "Software Development",
    description: "Automate software development, deployment and infrastructure processes.",
    requiredSkills: ["Linux", "Docker", "Kubernetes", "Git", "CI/CD"],
    relatedInterests: ["devops", "automation", "software development"],
    goalKeywords: ["devops", "devops engineer"]
  },
  {
    title: "Graphic Designer",
    category: "Creative Design",
    description: "Create visual content, branding materials and digital designs.",
    requiredSkills: ["Photoshop", "Illustrator", "Canva", "Typography", "Creativity"],
    relatedInterests: ["graphic design", "creative", "design"],
    goalKeywords: ["graphic designer", "graphic design"]
  },
  {
    title: "Database Administrator",
    category: "Database Management",
    description: "Manage, maintain and secure organizational databases.",
    requiredSkills: ["SQL", "MySQL", "MongoDB", "Database", "Backup"],
    relatedInterests: ["database", "sql", "data management"],
    goalKeywords: ["database administrator", "database"]
  },
  {
    title: "AI Engineer",
    category: "Artificial Intelligence",
    description: "Develop intelligent applications using artificial intelligence technologies.",
    requiredSkills: ["Python", "Machine Learning", "Deep Learning", "Mathematics", "NLP"],
    relatedInterests: ["artificial intelligence", "ai", "machine learning"],
    goalKeywords: ["ai engineer", "artificial intelligence"]
  },
  {
    title: "Business Analyst",
    category: "Business",
    description: "Analyze business needs and help organizations make better decisions.",
    requiredSkills: ["Excel", "SQL", "Communication", "Data Analysis", "Problem Solving"],
    relatedInterests: ["business", "analysis", "management"],
    goalKeywords: ["business analyst", "business analysis"]
  }
];

const normalize = (value) =>
  String(value || "").trim().toLowerCase();

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
      skill.name === normalize(requiredSkill)
    )
  );

  const missingSkills = career.requiredSkills.filter(
    (requiredSkill) => !matchedSkills.includes(requiredSkill)
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
    (matchedSkills.length / career.requiredSkills.length) * 70;

  const interestScore =
    (interestMatches.length / career.relatedInterests.length) * 20;

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(null);

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

  const interests = useMemo(() => {
    return String(profile.interests || "")
      .split(/[,;]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }, [profile.interests]);

  const analysis = useMemo(() => {
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
  }, [profile, skills, interests]);

  const recommendations = showAll
    ? analysis
    : analysis.slice(0, 4);

  const searchResults = useMemo(() => {
    const query = normalize(searchTerm);

    if (!query) return [];

    const matches = analysis.filter((career) =>
      normalize(career.title).includes(query) ||
      normalize(career.category).includes(query) ||
      normalize(career.description).includes(query) ||
      career.requiredSkills.some((skill) =>
        normalize(skill).includes(query)
      )
    );

    if (matches.length > 0) return matches;

    const title = searchTerm.trim();

    return [
      {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        category: "Career Exploration",
        description: `${title} is a career field you can explore. Learn about its professional responsibilities, industry requirements and opportunities before choosing this career path.`,
        requiredSkills: [
          "Communication",
          "Problem Solving",
          "Critical Thinking",
          "Digital Literacy",
          "Research Skills",
          "Adaptability",
          "Professional Knowledge"
        ],
        matchedSkills: [],
        missingSkills: [
          "Communication",
          "Problem Solving",
          "Critical Thinking",
          "Digital Literacy",
          "Research Skills",
          "Adaptability",
          "Professional Knowledge"
        ],
        matchScore: null,
        goalMatch: false,
        interestMatches: [],
        isCustomCareer: true,
        responsibilities: [
          `Learn the main responsibilities of a ${title}.`,
          "Develop the technical and professional skills required in this field.",
          "Work on relevant projects and practical tasks.",
          "Stay updated with industry trends and technologies."
        ],
        education: "Educational requirements depend on the specific profession, employer and country. Research relevant degrees, certifications or professional training.",
        learningAdvice: "Start by researching this profession, identifying its core skills and finding beginner-friendly courses and practical projects."
      }
    ];
  }, [searchTerm, analysis]);

  return (
    <section className="career-guidance">

      <div className="career-guidance-header">
        <div>
          <span className="career-eyebrow">AI CAREER ASSISTANT</span>
          <h1>Discover Your Career Path</h1>
          <p>
            Explore career opportunities based on your interests,
            skills and professional goals.
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
            {profile.department && profile.careerGoal
              ? "Ready"
              : "Incomplete"}
          </strong>
        </div>

      </div>

      <div className="career-search-section">

        <div className="career-search-heading">
          <h2>Find Your Dream Career</h2>
          <p>
            Search any career, profession or job role.
          </p>
        </div>

        <div className="career-search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search any career... e.g. Pilot, Doctor, Fashion Designer, Robotics Engineer"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedCareer(null);
            }}
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCareer(null);
              }}
            >
              Clear
            </button>
          )}
        </div>

        {searchTerm.trim() && (
          <div className="career-search-results">

            <h3>
              Search Results ({searchResults.length})
            </h3>

            {searchResults.length > 0 ? (
              searchResults.map((career) => (
                <button
                  type="button"
                  className={`career-search-result ${
                    selectedCareer?.title === career.title
                      ? "selected"
                      : ""
                  }`}
                  key={career.title}
                  onClick={() => setSelectedCareer(career)}
                >
                  <span>
                    <strong>{career.title}</strong>
                    <small>{career.category}</small>
                  </span>

                  <span className="career-search-match">
                    {career.isCustomCareer
                      ? "Explore Career →"
                      : `${career.matchScore}% Match`}
                  </span>
                </button>
              ))
            ) : (
              <div className="career-no-results">
                <h3>No matching career found</h3>
              </div>
            )}

          </div>
        )}

        {selectedCareer && (
          <article className="career-selected-details">

            <span className="career-category">
              {selectedCareer.category}
            </span>

            <h2>{selectedCareer.title}</h2>

            <p>{selectedCareer.description}</p>

            {selectedCareer.isCustomCareer ? (
              <>
                <div className="career-skill-section">
                  <h4>Job Responsibilities</h4>
                  <ul>
                    {selectedCareer.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="career-skill-section">
                  <h4>Required Skills to Develop</h4>
                  <div className="career-skill-tags">
                    {selectedCareer.requiredSkills.map((skill) => (
                      <span className="missing-tag" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="career-skill-section">
                  <h4>Educational Requirements</h4>
                  <p>{selectedCareer.education}</p>
                </div>

                <div className="career-skill-section">
                  <h4>How to Start This Career</h4>
                  <p>{selectedCareer.learningAdvice}</p>
                </div>

                <div className="career-notice">
                  <p>
                    General career guidance only. Verify profession-specific
                    requirements through reliable industry and educational sources.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="career-selected-match">
                  <strong>{selectedCareer.matchScore}%</strong>
                  <span>Your Career Match Score</span>
                </div>

                <div className="career-skill-section">
                  <h4>Required Skills</h4>
                  <div className="career-skill-tags">
                    {selectedCareer.requiredSkills.map((skill) => (
                      <span
                        className={
                          selectedCareer.matchedSkills.includes(skill)
                            ? "matched-tag"
                            : "missing-tag"
                        }
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="career-skill-section">
                  <h4>Skills You Need to Improve</h4>
                  <div className="career-skill-tags">
                    {selectedCareer.missingSkills.length > 0 ? (
                      selectedCareer.missingSkills.map((skill) => (
                        <span className="missing-tag" key={skill}>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="matched-tag">
                        You have all listed skills!
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}

          </article>
        )}

      </div>

      {(!profile.department || !profile.careerGoal || skills.length === 0) && (
        <div className="career-notice">
          <h3>Complete Your Student Information</h3>
          <p>
            Complete your profile, add your career goal and enter
            your skills in My Skills to receive more relevant recommendations.
          </p>
        </div>
      )}

      <div className="career-recommendation-heading">

        <div>
          <h2>Recommended Career Paths</h2>
          <p>
            Ranked using your current skills, interests and career goal.
          </p>
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
          <article
            className="career-recommendation-card"
            key={career.title}
          >

            <div className="career-card-top">

              <div>
                <span className="career-category">
                  {career.category}
                </span>
                <h3>{career.title}</h3>
              </div>

              <div className="career-match">
                <strong>{career.matchScore}%</strong>
                <span>Match</span>
              </div>

            </div>

            <p className="career-description">
              {career.description}
            </p>

            <div className="career-match-progress">
              <div style={{ width: `${career.matchScore}%` }} />
            </div>

            <div className="career-skill-section">
              <h4>
                Matched Skills ({career.matchedSkills.length})
              </h4>

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
              <h4>
                Skills to Learn ({career.missingSkills.length})
              </h4>

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

              <span>
                {career.interestMatches.length} interest matches
              </span>
            </div>

          </article>
        ))}

      </div>

      <div className="career-disclaimer">
        <strong>How this analysis works</strong>
        <p>
          Recommendations are calculated using your saved profile
          and our career-skill dataset. Match percentages are
          indicative scores, not guaranteed employment predictions.
        </p>
      </div>

    </section>
  );
}

export default CareerGuidance;
