
import { useState } from "react";
import "./AdminSetup.css";

function AdminSetup({ onBack }) {
  const [formData, setFormData] = useState({
    fullName: "",
    userId: "",
    email: "",
    password: "",
    setupKey: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin-setup/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-setup-key": formData.setupKey,
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            userId: formData.userId,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Admin creation failed.");
        return;
      }

      setMessage("Admin account created successfully!");

      setFormData({
        fullName: "",
        userId: "",
        email: "",
        password: "",
        setupKey: "",
      });
    } catch (error) {
      setError("Connection Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Initial Admin Setup</h1>
        <p>Create your UniCareer administrator account.</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>User ID</label>
          <input name="userId" value={formData.userId} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label>Admin Setup Key</label>
          <input type="password" name="setupKey" value={formData.setupKey} onChange={handleChange} required />

          {error && <p className="form-message">{error}</p>}
          {message && <p>{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Admin Account"}
          </button>
        </form>

        <button type="button" onClick={onBack}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default AdminSetup;
