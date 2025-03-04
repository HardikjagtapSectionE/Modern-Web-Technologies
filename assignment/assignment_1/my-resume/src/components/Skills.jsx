import { useEffect, useState } from "react";
import { fetchSkills } from "../services/api";
import "../App.css";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills().then(setSkills);
  }, []);

  return (
    <div className="section">
      <h3>🛠️ Skills</h3>
      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
