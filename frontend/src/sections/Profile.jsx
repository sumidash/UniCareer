import { useState } from "react";
import "./Profile.css";

function Profile({ currentUser }) {
  // Each user gets a separate storage key.
  const profileKey = `unicareerProfile_${currentUser?.userId || "unknown"}`;

  const [profile, setProfile] = useState(() => {
    const defaultProfile = {
      fullName: currentUser?.fullName || "",
      studentId: "",
      university: "",
      department: "",
      semester: "",
      interests: "",
      careerGoal: "",
    };

    try {
      const savedProfile = localStorage.getItem(profileKey);

      return savedProfile
        ? { ...defaultProfile, ...JSON.parse(savedProfile) }
        : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      localStorage.setItem(profileKey, JSON.stringify(profile));
      setMessage("Your profile has been saved successfully!");
    } catch {
      setMessage("Unable to save your profile. Please try again.");
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-intro">
        <span className="profile-tag">STUDENT INFORMATION</span>
        <h2>My Profile</h2>
        <p>
          Tell us about yourself to receive more personalized career guidance.
        </p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-form-heading">
          <h3>Personal & Academic Details</h3>
          <p>Complete your information below.</p>
        </div>

        <div className="profile-form-grid">
          <div className="profile-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="profile-field">
            <label htmlFor="studentId">Student ID</label>
            <input
              id="studentId"
              name="studentId"
              value={profile.studentId}
              onChange={handleChange}
              placeholder="Enter your student ID"
            />
          </div>

          <div className="profile-field">
            <label htmlFor="university">University Name</label>
            <input
              id="university"
              name="university"
              value={profile.university}
              onChange={handleChange}
              placeholder="Enter your university"
            />
          </div>

          <div className="profile-field">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              name="department"
              value={profile.department}
              onChange={handleChange}
              placeholder="e.g. Computer Science & Engineering"
            />
          </div>

          <div className="profile-field">
            <label htmlFor="semester">Current Semester</label>
            <input
              id="semester"
              name="semester"
              value={profile.semester}
              onChange={handleChange}
              placeholder="e.g. 5th Semester"
            />
          </div>

          <div className="profile-field">
            <label htmlFor="careerGoal">Career Goal</label>
            <input
              id="careerGoal"
              name="careerGoal"
              value={profile.careerGoal}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
            />
          </div>

          <div className="profile-field full-width">
            <label htmlFor="interests">Academic Interests</label>
            <textarea
              id="interests"
              name="interests"
              value={profile.interests}
              onChange={handleChange}
              placeholder="Describe your interests, favorite subjects, or areas you want to explore..."
              rows="4"
            />
          </div>
        </div>

        <div className="profile-form-footer">
          <p className="profile-message" role="status">
            {message}
          </p>

          <button type="submit" className="save-profile-button">
            Save Profile <span>→</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;