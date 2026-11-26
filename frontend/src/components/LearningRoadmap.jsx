
import { useEffect, useState } from "react";
import "./LearningRoadmap.css";

const storageKey = "unicareerLearningRoadmap";

const careerOptions = [
  "Frontend Developer", "Backend Developer", "UI/UX Designer",
  "Software Engineer", "Web Developer", "Mobile App Developer",
  "Civil Engineer", "Electrical Engineer", "Mechanical Engineer",
  "Computer Engineer", "Robotics Engineer", "Biomedical Engineer",
  "Data Scientist", "Data Analyst", "AI Engineer",
  "Cybersecurity Analyst", "Researcher", "Business Analyst",
  "Entrepreneur", "Government Officer", "Lawyer", "Architect",
  "Journalist", "Graphic Designer", "Accountant",
  "Marketing Manager", "Pharmacist", "Agricultural Scientist"
];

const roadmaps = {
  "Frontend Developer": [
    {
      level: "Beginner",
      title: "HTML & CSS",
      description: "Learn webpage structure, styling, and responsive layouts.",
      courses: "HTML, CSS, Flexbox, CSS Grid",
      duration: "2 weeks",
      practice: "Create a responsive personal profile webpage."
    },
    {
      level: "Beginner",
      title: "JavaScript Fundamentals",
      description: "Understand programming basics and DOM manipulation.",
      courses: "Variables, Functions, Arrays, DOM",
      duration: "3 weeks",
      practice: "Build a calculator or interactive to-do list."
    },
    {
      level: "Intermediate",
      title: "React.js",
      description: "Build interactive user interfaces using React.",
      courses: "Components, Props, State, Hooks",
      duration: "3 weeks",
      practice: "Build a small React app with multiple components."
    },
    {
      level: "Intermediate",
      title: "API Integration",
      description: "Learn how frontend applications communicate with APIs.",
      courses: "REST API, Fetch, Axios, JSON",
      duration: "1 week",
      practice: "Display data from a public API in your React app."
    },
    {
      level: "Advanced",
      title: "Build and Deploy Projects",
      description: "Create and deploy professional frontend projects.",
      courses: "Git, GitHub, Deployment, Portfolio",
      duration: "2 weeks",
      practice: "Deploy a complete portfolio or project website."
    }
  ],

  "Backend Developer": [
    {
      level: "Beginner",
      title: "Programming Fundamentals",
      description: "Learn programming concepts and problem solving.",
      courses: "JavaScript or Python, Variables, Functions, Data Structures",
      duration: "3 weeks",
      practice: "Write small programs to solve everyday problems."
    },
    {
      level: "Beginner",
      title: "Database Fundamentals",
      description: "Understand database design and data management.",
      courses: "SQL, MySQL, Tables, Relationships",
      duration: "2 weeks",
      practice: "Design a database for a student management system."
    },
    {
      level: "Intermediate",
      title: "Backend Development",
      description: "Learn server-side programming and application logic.",
      courses: "Node.js, Express.js, Routing",
      duration: "3 weeks",
      practice: "Create a server with routes for a basic application."
    },
    {
      level: "Intermediate",
      title: "API Development",
      description: "Create and manage backend APIs.",
      courses: "REST API, CRUD, Authentication",
      duration: "2 weeks",
      practice: "Build a CRUD API for managing tasks."
    },
    {
      level: "Advanced",
      title: "Backend Project",
      description: "Build and deploy a complete backend application.",
      courses: "Git, Security, Testing, Deployment",
      duration: "3 weeks",
      practice: "Build and deploy a backend for a small web application."
    }
  ],

  "UI/UX Designer": [
    {
      level: "Beginner",
      title: "Design Fundamentals",
      description: "Understand visual design principles.",
      courses: "Color, Typography, Layout, Spacing",
      duration: "2 weeks",
      practice: "Redesign the layout of a simple webpage."
    },
    {
      level: "Beginner",
      title: "Figma Basics",
      description: "Learn to create digital designs using Figma.",
      courses: "Frames, Components, Auto Layout, Prototyping",
      duration: "2 weeks",
      practice: "Create a simple mobile app screen in Figma."
    },
    {
      level: "Intermediate",
      title: "User Experience",
      description: "Learn user research and wireframing.",
      courses: "User Research, Wireframes, User Flow",
      duration: "2 weeks",
      practice: "Create a user flow and wireframe for a login process."
    },
    {
      level: "Intermediate",
      title: "UI Design",
      description: "Create attractive and user-friendly interfaces.",
      courses: "Visual Design, Design Systems, Accessibility",
      duration: "3 weeks",
      practice: "Design a consistent set of screens for a mobile app."
    },
    {
      level: "Advanced",
      title: "Design Portfolio",
      description: "Build professional design case studies.",
      courses: "Case Studies, Portfolio, Projects",
      duration: "2 weeks",
      practice: "Prepare a case study explaining your design decisions."
    }
  ]
};

const customRoadmap = [
  {
    level: "Beginner",
    title: "Career Introduction",
    description: "Understand your selected career and its opportunities.",
    courses: "Career Research, Responsibilities, Career Scope",
    duration: "1 week",
    practice: "Research the career and list its common responsibilities."
  },
  {
    level: "Beginner",
    title: "Basic Knowledge",
    description: "Learn the fundamental knowledge required for this career.",
    courses: "Basic Concepts, Fundamentals, Core Knowledge",
    duration: "2 weeks",
    practice: "Make short notes on the main concepts you learned."
  },
  {
    level: "Intermediate",
    title: "Professional Skills",
    description: "Develop important skills related to your career.",
    courses: "Professional Skills, Tools, Practical Learning",
    duration: "3 weeks",
    practice: "Practice one important skill using a small task."
  },
  {
    level: "Intermediate",
    title: "Practical Experience",
    description: "Improve your knowledge through practical activities.",
    courses: "Practice, Projects, Experience",
    duration: "2 weeks",
    practice: "Complete a small project related to your selected career."
  },
  {
    level: "Advanced",
    title: "Career Preparation",
    description: "Prepare yourself for professional opportunities.",
    courses: "Portfolio, Resume, Interview Preparation",
    duration: "1 week",
    practice: "Prepare a resume and a short career portfolio."
  }
];

const studyResources = {
  "Frontend Developer": [
    [
      { name: "W3Schools HTML", url: "https://www.w3schools.com/html/" },
      { name: "MDN CSS Guide", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "HTML & CSS Tutorial", url: "https://www.youtube.com/results?search_query=HTML+CSS+beginner+tutorial" }
    ],
    [
      { name: "JavaScript MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "JavaScript Tutorial", url: "https://www.w3schools.com/js/" },
      { name: "JavaScript Video Course", url: "https://www.youtube.com/results?search_query=JavaScript+beginner+tutorial" }
    ],
    [
      { name: "React Documentation", url: "https://react.dev/learn" },
      { name: "React Tutorial", url: "https://www.w3schools.com/react/" },
      { name: "React Video Course", url: "https://www.youtube.com/results?search_query=React+JS+beginner+tutorial" }
    ],
    [
      { name: "MDN Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" },
      { name: "JSON Guide", url: "https://www.w3schools.com/js/js_json_intro.asp" },
      { name: "API Tutorial", url: "https://www.youtube.com/results?search_query=REST+API+JavaScript+tutorial" }
    ],
    [
      { name: "Git Documentation", url: "https://git-scm.com/doc" },
      { name: "GitHub Skills", url: "https://skills.github.com/" },
      { name: "Netlify Deployment", url: "https://docs.netlify.com/" }
    ]
  ],

  "Backend Developer": [
    [
      { name: "JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Python Tutorial", url: "https://www.w3schools.com/python/" },
      { name: "Programming Videos", url: "https://www.youtube.com/results?search_query=programming+fundamentals+beginner" }
    ],
    [
      { name: "SQL Tutorial", url: "https://www.w3schools.com/sql/" },
      { name: "MongoDB University", url: "https://learn.mongodb.com/" },
      { name: "Database Tutorial", url: "https://www.youtube.com/results?search_query=database+fundamentals+tutorial" }
    ],
    [
      { name: "Node.js Documentation", url: "https://nodejs.org/en/learn" },
      { name: "Express Documentation", url: "https://expressjs.com/" },
      { name: "Backend Tutorial", url: "https://www.youtube.com/results?search_query=Node.js+Express+tutorial" }
    ],
    [
      { name: "REST API Guide", url: "https://developer.mozilla.org/en-US/docs/Glossary/REST" },
      { name: "Postman Learning", url: "https://learning.postman.com/" },
      { name: "API Tutorial", url: "https://www.youtube.com/results?search_query=REST+API+CRUD+tutorial" }
    ],
    [
      { name: "GitHub Skills", url: "https://skills.github.com/" },
      { name: "OWASP Security", url: "https://owasp.org/www-project-top-ten/" },
      { name: "Deployment Guide", url: "https://www.youtube.com/results?search_query=Node.js+backend+deployment+tutorial" }
    ]
  ],

  "UI/UX Designer": [
    [
      { name: "Design Principles", url: "https://www.interaction-design.org/literature/topics/design-principles" },
      { name: "Canva Design School", url: "https://www.canva.com/designschool/" },
      { name: "Design Tutorial", url: "https://www.youtube.com/results?search_query=UI+UX+design+fundamentals" }
    ],
    [
      { name: "Figma Learn", url: "https://help.figma.com/" },
      { name: "Figma Community", url: "https://www.figma.com/community" },
      { name: "Figma Tutorial", url: "https://www.youtube.com/results?search_query=Figma+beginner+tutorial" }
    ],
    [
      { name: "UX Research Guide", url: "https://www.nngroup.com/articles/ux-research-cheat-sheet/" },
      { name: "Interaction Design", url: "https://www.interaction-design.org/" },
      { name: "Wireframe Tutorial", url: "https://www.youtube.com/results?search_query=UX+research+wireframing+tutorial" }
    ],
    [
      { name: "Material Design", url: "https://m3.material.io/" },
      { name: "Apple Design Resources", url: "https://developer.apple.com/design/" },
      { name: "UI Design Tutorial", url: "https://www.youtube.com/results?search_query=UI+design+principles+tutorial" }
    ],
    [
      { name: "Behance", url: "https://www.behance.net/" },
      { name: "Dribbble", url: "https://dribbble.com/" },
      { name: "UX Case Study Tutorial", url: "https://www.youtube.com/results?search_query=UX+case+study+portfolio" }
    ]
  ]
};

function getResources(career, index, step) {
  if (studyResources[career]?.[index]) {
    return studyResources[career][index];
  }

  const query = encodeURIComponent(`${career} ${step.title} tutorial`);

  return [
    {
      name: "Google Learning Resources",
      url: `https://www.google.com/search?q=${query}`
    },
    {
      name: "YouTube Tutorials",
      url: `https://www.youtube.com/results?search_query=${query}`
    },
    {
      name: "Online Courses",
      url: `https://www.coursera.org/search?query=${encodeURIComponent(career)}`
    }
  ];
}

function LearningRoadmap() {
  const [savedData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch {
      return {};
    }
  });

  const [career, setCareer] = useState(
    savedData.career || "Frontend Developer"
  );

  const [completedByCareer, setCompletedByCareer] = useState(
    savedData.completedByCareer || {}
  );

  const [searchCareer, setSearchCareer] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ career, completedByCareer })
    );
  }, [career, completedByCareer]);

  const searchResults = careerOptions.filter((item) =>
    item.toLowerCase().includes(searchCareer.trim().toLowerCase())
  );

  const steps = roadmaps[career] || customRoadmap;
  const completed = completedByCareer[career] || [];
  const progress = Math.round((completed.length / steps.length) * 100);

  const nextIndex = steps.findIndex(
    (_, index) => !completed.includes(index)
  );

  const selectCareer = (value) => {
    const newCareer = value.trim();
    if (!newCareer) return;

    setCareer(newCareer);
    setSearchCareer("");
    setShowSuggestions(false);
  };

  const toggleComplete = (index) => {
    setCompletedByCareer((prev) => {
      const current = prev[career] || [];

      const updated = current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index];

      return { ...prev, [career]: updated };
    });
  };

  const resetProgress = () => {
    setCompletedByCareer((prev) => ({
      ...prev,
      [career]: []
    }));
  };

  return (
    <div className="roadmap-page">
      <div className="roadmap-header">
        <p className="roadmap-label">YOUR LEARNING JOURNEY</p>
        <h1>Learning Roadmap</h1>
        <p>
          Follow your learning path, practice your skills, and prepare for
          your dream career.
        </p>
      </div>

      <div className="roadmap-selector">
        <label htmlFor="career-search">Search Any Career</label>

        <div className="career-search-wrapper">
          <input
            id="career-search"
            type="text"
            placeholder="Search any career..."
            value={searchCareer}
            onChange={(e) => {
              setSearchCareer(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (searchResults.length > 0) {
                  selectCareer(searchResults[0]);
                } else {
                  selectCareer(searchCareer);
                }
              }

              if (e.key === "Escape") {
                setShowSuggestions(false);
              }
            }}
          />

          {showSuggestions && searchCareer.trim() && (
            <div className="career-suggestions">
              {searchResults.map((item) => (
                <button
                  type="button"
                  className="career-suggestion"
                  key={item}
                  onClick={() => selectCareer(item)}
                >
                  {item}
                </button>
              ))}

              {!searchResults.some(
                (item) =>
                  item.toLowerCase() === searchCareer.trim().toLowerCase()
              ) && (
                <button
                  type="button"
                  className="career-suggestion"
                  onClick={() => selectCareer(searchCareer)}
                >
                  Use "{searchCareer.trim()}"
                </button>
              )}

              {searchResults.length === 0 && (
                <p className="career-no-result">
                  No matching career found. You can use your own career name.
                </p>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          className="complete-btn search-career-btn"
          disabled={!searchCareer.trim()}
          onClick={() => selectCareer(searchCareer)}
        >
          Search Career
        </button>

        <label htmlFor="popular-career">Select Popular Career</label>

        <select
          id="popular-career"
          value={careerOptions.includes(career) ? career : ""}
          onChange={(e) => selectCareer(e.target.value)}
        >
          <option value="" disabled>Select a career</option>
          {careerOptions.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="roadmap-summary">
        <div className="roadmap-summary-heading">
          <div>
            <p className="roadmap-label">YOUR SELECTED CAREER</p>
            <h2>{career}</h2>
          </div>
          <span className="roadmap-step-count">
            {steps.length} Learning Steps
          </span>
        </div>

        <div className="roadmap-progress">
          <div className="progress-info">
            <div>
              <h3>Your Learning Progress</h3>
              <p>{completed.length} of {steps.length} steps completed</p>
            </div>
            <span>{progress}%</span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Learning progress"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          {progress === 100 && (
            <p className="roadmap-success">
              Great job! You have completed this learning roadmap.
            </p>
          )}

          <button
            type="button"
            className="reset-progress-btn"
            onClick={resetProgress}
            disabled={completed.length === 0}
          >
            Reset Progress
          </button>
        </div>
      </div>

      {nextIndex !== -1 && completed.length > 0 && (
        <div className="next-step-box">
          <p className="roadmap-label">YOUR NEXT LEARNING GOAL</p>
          <h3>{steps[nextIndex].title}</h3>
          <p>
            You have completed your previous step. Continue with
            {` ${steps[nextIndex].title}`} to move forward in your career journey.
          </p>
        </div>
      )}

      {progress === 100 && (
        <div className="next-step-box">
          <p className="roadmap-label">ROADMAP COMPLETED</p>
          <h3>Congratulations!</h3>
          <p>You have completed all learning steps for {career}.</p>
        </div>
      )}

      <div className="roadmap-list">
        {steps.map((step, index) => {
          const isCompleted = completed.includes(index);
          const resources = getResources(career, index, step);

          return (
            <div
              className={`roadmap-card ${isCompleted ? "completed" : ""}`}
              key={`${career}-${index}`}
            >
              <div className="roadmap-number">
                {isCompleted ? "✓" : index + 1}
              </div>

              <div className="roadmap-content">
                <div className="roadmap-card-top">
                  <span className="roadmap-level">{step.level}</span>
                  <span className="roadmap-duration">
                    ◷ {step.duration}
                  </span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>

                <div className="course-info">
                  <strong>Topics to Learn</strong>
                  <span>{step.courses}</span>
                </div>

                <div className="practice-info">
                  <strong>Practice Task</strong>
                  <span>{step.practice}</span>
                </div>

                <div className="resource-info">
                  <strong>Study Resources</strong>
                  <div className="resource-links">
                    {resources.map((resource) => (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={resource.name}
                      >
                        {resource.name} ↗
                      </a>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="complete-btn"
                  onClick={() => toggleComplete(index)}
                >
                  {isCompleted ? "Completed ✓" : "Mark as Completed"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LearningRoadmap;
