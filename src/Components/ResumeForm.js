import React, { useState } from "react";
import './styles.css';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: [{ degree: "", institution: "", year: "" }],
    experience: "",
    skills: [""],
  });
  
  const [submittedData, setSubmittedData] = useState(null);
  const handleChange = (e, index, section) => {
    const { name, value } = e.target;

    if (section === "skills") {
      const updatedSkills = [...formData.skills];
      updatedSkills[index] = value;
      setFormData({ ...formData, skills: updatedSkills });
    } else if (section === "education") {
      const updatedEducation = [...formData.education];
      updatedEducation[index][name] = value;
      setFormData({ ...formData, education: updatedEducation });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddField = (section) => {
    if (section === "skills") {
      setFormData({ ...formData, skills: [...formData.skills, ""] });
    } else if (section === "education") {
      setFormData({
        ...formData,
        education: [...formData.education, { degree: "", institution: "", year: "" }]
      });
    }
  };

  const handleRemoveField = (index, section) => {
    if (section === "skills") {
      const updatedSkills = [...formData.skills];
      updatedSkills.splice(index, 1);
      setFormData({ ...formData, skills: updatedSkills });
    } else if (section === "education") {
      const updatedEducation = [...formData.education];
      updatedEducation.splice(index, 1);
      setFormData({ ...formData, education: updatedEducation });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      education: [{ degree: "", institution: "", year: "" }],
      experience: "",
      skills: [""],
    });
  };

  return (
    <div>
      <h1 className="heading">Resume Form</h1>

      {!submittedData ? (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-field">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>


          <div className="education-section">
            <label className="form-label">Education Qualification:</label>
            {formData.education.map((educationItem, index) => (
              <div key={index} className="education-item">
                <input
                  type="text"
                  name="degree"
                  value={educationItem.degree}
                  onChange={(e) => handleChange(e, index, "education")}
                  placeholder="Degree"
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  name="institution"
                  value={educationItem.institution}
                  onChange={(e) => handleChange(e, index, "education")}
                  placeholder="Institution"
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  name="year"
                  value={educationItem.year}
                  onChange={(e) => handleChange(e, index, "education")}
                  placeholder="Year"
                  className="form-input"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemoveField(index, "education")}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-button"
              onClick={() => handleAddField("education")}
            >
              Add Education
            </button>
          </div>

          <div className="form-field">
            <label className="form-label">Experience:</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="form-textarea"
              required
            ></textarea>
          </div>

          <div className="skills-section">
            <label className="form-label">Skills:</label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleChange(e, index, "skills")}
                  className="form-input"
                  placeholder="Skill"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemoveField(index, "skills")}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-button"
              onClick={() => handleAddField("skills")}
            >
              Add Skill
            </button>
          </div>

          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      ) : (
        <div className="result-container">
          <p className="result-item">
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p className="result-item">
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p className="result-item">
            <strong>Phone Number:</strong> {submittedData.phone}
          </p>
          <p className="result-item">
            <strong>Education Qualification:</strong>
          </p>
          {submittedData.education.map((edu, index) => (
            <div key={index}>
              <p className="result-item">Degree: {edu.degree}</p>
              <p className="result-item">Institution: {edu.institution}</p>
              <p className="result-item">Year: {edu.year}</p>
            </div>
          ))}
          <p className="result-item">
            <strong>Experience:</strong> {submittedData.experience}
          </p>
          <p className="result-item">
            <strong>Skills:</strong> {submittedData.skills.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;
