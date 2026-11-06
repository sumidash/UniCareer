
import "./CareerGuidance.css";

const careers = [
  {
    icon: "⌘",
    title: "Software Developer",
    category: "TECHNOLOGY",
    description: "Build applications, websites and innovative software solutions.",
    skills: ["Programming", "Problem Solving"],
  },
  {
    icon: "◈",
    title: "Data Analyst",
    category: "DATA & ANALYTICS",
    description: "Transform data into meaningful insights and decisions.",
    skills: ["Python", "Data Analysis"],
  },
  {
    icon: "✧",
    title: "UI/UX Designer",
    category: "DESIGN",
    description: "Create meaningful and user-friendly digital experiences.",
    skills: ["Creativity", "Figma"],
  },
];

function CareerGuidance() {
  return (
    <section className="career-section" id="career">
      <div className="career-heading">
        <span className="section-label">EXPLORE POSSIBILITIES</span>
        <h2>
          Find Your <span>Career Direction</span>
        </h2>
        <p>
          Explore career paths that match your interests,
          strengths and professional ambitions.
        </p>
      </div>

      <div className="career-grid">
        {careers.map((career, index) => (
          <div className="career-option" key={career.title}>
            <div className="career-option-top">
              <div className="career-option-icon">{career.icon}</div>
              <span className="career-number">0{index + 1}</span>
            </div>

            <span className="career-category">{career.category}</span>
            <h3>{career.title}</h3>
            <p className="career-description">{career.description}</p>

            <div className="career-skills">
              {career.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <a href="#profile" className="career-explore">
              Explore Path <span>↗</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CareerGuidance;
