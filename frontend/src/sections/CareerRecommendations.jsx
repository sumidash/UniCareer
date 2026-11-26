
import { useMemo, useState } from "react";
import "./CareerRecommendations.css";

const careerData = [
  {
    title: "Frontend Developer",
    description: "Build attractive, interactive and responsive websites.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
    opportunities: ["Frontend Developer", "React Developer", "UI Developer"],
    learning: ["HTML and CSS", "JavaScript", "React", "Responsive Design", "Build Projects"],
  },
  {
    title: "Backend Developer",
    description: "Develop server-side applications, APIs and databases.",
    skills: ["JavaScript", "Node.js", "Express.js", "MongoDB", "SQL"],
    opportunities: ["Backend Developer", "API Developer", "Software Engineer"],
    learning: ["Programming Fundamentals", "Node.js", "Express.js", "Database Management", "API Development"],
  },
  {
    title: "UI/UX Designer",
    description: "Create user-friendly digital experiences and interfaces.",
    skills: ["Figma", "UI Design", "UX Design", "Wireframing", "Prototyping"],
    opportunities: ["UI Designer", "UX Designer", "Product Designer"],
    learning: ["Design Fundamentals", "Figma", "Wireframing", "Prototyping", "Portfolio Development"],
  },
  {
    title: "Data Analyst",
    description: "Analyze information and discover useful business insights.",
    skills: ["Python", "SQL", "Excel", "Statistics", "Data Visualization"],
    opportunities: ["Data Analyst", "Business Analyst", "Research Analyst"],
    learning: ["Excel", "SQL", "Python", "Statistics", "Data Visualization"],
  },
  {
    title: "Data Scientist",
    description: "Use data, statistics and machine learning to solve problems.",
    skills: ["Python", "Statistics", "SQL", "Machine Learning", "Data Visualization"],
    opportunities: ["Data Scientist", "Machine Learning Analyst", "Research Scientist"],
    learning: ["Python", "Statistics", "SQL", "Machine Learning", "Real-world Projects"],
  },
  {
    title: "AI Engineer",
    description: "Develop intelligent applications using artificial intelligence.",
    skills: ["Python", "Machine Learning", "Deep Learning", "Mathematics", "AI"],
    opportunities: ["AI Engineer", "Machine Learning Engineer", "AI Developer"],
    learning: ["Python", "Mathematics", "Machine Learning", "Deep Learning", "AI Projects"],
  },
  {
    title: "Cybersecurity Specialist",
    description: "Protect computer systems, networks and digital information.",
    skills: ["Networking", "Linux", "Cybersecurity", "Ethical Hacking", "Security Tools"],
    opportunities: ["Security Analyst", "Ethical Hacker", "Security Engineer"],
    learning: ["Networking", "Linux", "Security Fundamentals", "Ethical Hacking", "Security Labs"],
  },
  {
    title: "Mobile App Developer",
    description: "Create applications for Android and iOS devices.",
    skills: ["Java", "Kotlin", "Flutter", "Dart", "React Native"],
    opportunities: ["Android Developer", "iOS Developer", "Mobile App Developer"],
    learning: ["Programming Fundamentals", "Mobile Development", "Flutter or React Native", "App Design", "Build Apps"],
  },
  {
    title: "Game Developer",
    description: "Design and develop interactive video games.",
    skills: ["C++", "C#", "Unity", "Unreal Engine", "Game Design"],
    opportunities: ["Game Programmer", "Game Designer", "Game Developer"],
    learning: ["Programming", "Game Design", "Unity or Unreal Engine", "Game Physics", "Build Games"],
  },
  {
    title: "Software Engineer",
    description: "Design, develop, test and maintain software applications.",
    skills: ["Java", "Python", "C++", "Data Structures", "Problem Solving"],
    opportunities: ["Software Engineer", "Software Developer", "Application Developer"],
    learning: ["Programming", "Data Structures", "Algorithms", "Software Development", "Build Projects"],
  },
];

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

// Custom career for any user search
function createCareer(title) {
  return {
    title,
    description: `${title} is a professional career path where you can develop specialized knowledge, practical skills and industry experience.`,

    skills: [
      "Communication",
      "Problem Solving",
      "Technical Knowledge",
      "Critical Thinking",
      "Practical Experience",
    ],

    opportunities: [
      `${title} Specialist`,
      `${title} Professional`,
      `${title} Consultant`,
    ],

    learning: [
      `Research about ${title}`,
      "Learn fundamental concepts",
      "Develop relevant professional skills",
      "Practice real-world projects",
      "Build a professional portfolio",
    ],
  };
}

// Calculate career matching
function calculateMatch(career, userSkillNames) {
  const matchedSkills = career.skills.filter((requiredSkill) =>
    userSkillNames.includes(normalize(requiredSkill))
  );

  const missingSkills = career.skills.filter(
    (skill) => !matchedSkills.includes(skill)
  );

  const percentage = Math.round(
    (matchedSkills.length / career.skills.length) * 100
  );

  return {
    matchedSkills,
    missingSkills,
    percentage,
  };
}

function CareerRecommendations({ mySkills = [] }) {
  const [search, setSearch] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(null);

  // Get skills from My Skills
  const userSkillNames = useMemo(() => {
    return mySkills
      .map((skill) =>
        normalize(
          typeof skill === "string"
            ? skill
            : skill.skillName || skill.name
        )
      )
      .filter(Boolean);
  }, [mySkills]);

  // Personalized career recommendations
  const recommendations = useMemo(() => {
    return careerData
      .map((career) => ({
        ...career,
        ...calculateMatch(career, userSkillNames),
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }, [userSkillNames]);

  // Search any career
  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    const foundCareer = careerData.find(
      (career) => normalize(career.title) === normalize(query)
    );

    const career = foundCareer || createCareer(query);

    setSelectedCareer({
      ...career,
      ...calculateMatch(career, userSkillNames),
    });
  };

  // Select recommended career
  const selectCareer = (career) => {
    setSearch(career.title);
    setSelectedCareer(career);
  };

  return (
    <div className="recommendations-page">

      {/* Header */}
      <div className="recommendations-header">
        <p className="recommendations-label">
          YOUR FUTURE STARTS HERE
        </p>

        <h1>Personalized Career Recommendations</h1>

        <p>
          Discover careers that match your skills, explore opportunities
          and identify the skills you need to develop.
        </p>
      </div>

      {/* Summary */}
      <div className="personalized-summary">
        <div>
          <span className="summary-number">
            {mySkills.length}
          </span>
          <p>Your Added Skills</p>
        </div>

        <div>
          <span className="summary-number">
            {careerData.length}
          </span>
          <p>Career Paths</p>
        </div>

        <div>
          <span className="summary-number">
            {recommendations[0]?.percentage || 0}%
          </span>
          <p>Best Career Match</p>
        </div>
      </div>

      {/* Custom Career Search */}
      <form
        className="career-search-form"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search any career you are interested in..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          Search Career
        </button>
      </form>

      {/* Empty Skills Message */}
      {mySkills.length === 0 && (
        <div className="career-info-card">
          <h3>Add Your Skills</h3>

          <p>
            You have not added any skills yet. Add your skills in
            My Skills to receive personalized career recommendations.
          </p>
        </div>
      )}

      {/* Career Recommendations */}
      <section className="popular-careers">

        <div className="recommendation-section-heading">
          <h2>Recommended Careers For You</h2>

          <p>
            Ranked according to your current skills.
          </p>
        </div>

        <div className="career-recommendation-grid">

          {recommendations.map((career) => (
            <div
              className="recommendation-card"
              key={career.title}
            >
              <span className="career-match">
                {career.percentage}% Match
              </span>

              <h3>{career.title}</h3>

              <p>{career.description}</p>

              <div className="match-progress">
                <div
                  className="match-progress-fill"
                  style={{
                    width: `${career.percentage}%`,
                  }}
                />
              </div>

              <p>
                {career.matchedSkills.length} of{" "}
                {career.skills.length} skills matched
              </p>

              <button
                type="button"
                onClick={() => selectCareer(career)}
              >
                Explore Career →
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* Selected Career Details */}
      {selectedCareer && (
        <section className="career-details">

          <div className="career-details-header">
            <div>
              <p className="recommendations-label">
                CAREER DETAILS
              </p>

              <h2>{selectedCareer.title}</h2>
            </div>

            <button
              type="button"
              className="close-career"
              onClick={() => setSelectedCareer(null)}
            >
              Clear
            </button>
          </div>

          {/* Overview */}
          <div className="career-info-card">
            <h3>Career Overview</h3>
            <p>{selectedCareer.description}</p>
          </div>

          {/* Match */}
          <div className="career-info-card">
            <h3>Your Career Match</h3>

            <h2 className="match-percentage">
              {selectedCareer.percentage}%
            </h2>

            <p>
              {selectedCareer.matchedSkills.length} matching skills
              out of {selectedCareer.skills.length} required skills.
            </p>
          </div>

          {/* Required Skills */}
          <div className="career-info-card">
            <h3>Required Skills</h3>

            <div className="career-skills">
              {selectedCareer.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Matching Skills */}
          <div className="career-info-card">
            <h3>Your Matching Skills</h3>

            {selectedCareer.matchedSkills.length > 0 ? (
              <div className="career-skills">
                {selectedCareer.matchedSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            ) : (
              <p>No matching skills found yet.</p>
            )}
          </div>

          {/* Missing Skills */}
          <div className="career-info-card">
            <h3>Skills You Need to Develop</h3>

            {selectedCareer.missingSkills.length > 0 ? (
              <div className="career-skills missing-skills">
                {selectedCareer.missingSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            ) : (
              <p>
                You have all the listed required skills!
              </p>
            )}
          </div>

          {/* Opportunities */}
          <div className="career-info-card">
            <h3>Career Opportunities</h3>

            <ul>
              {selectedCareer.opportunities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Learning Direction */}
          <div className="career-info-card">
            <h3>Recommended Learning Direction</h3>

            <ol>
              {selectedCareer.learning.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

        </section>
      )}

    </div>
  );
}

export default CareerRecommendations;
