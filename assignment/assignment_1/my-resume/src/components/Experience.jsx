import { useEffect, useState } from "react";
import { fetchExperience } from "../services/api";
import "../App.css";

const Experience = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetchExperience().then(setExperience);
  }, []);

  return (
    <div className="section">
      <h3>💼 Work Experience</h3>
      {experience.map((exp, index) => (
        <div key={index} className="card">
          <strong>{exp.role}</strong> at {exp.company} ({exp.year})
        </div>
      ))}
    </div>
  );
};

export default Experience;
