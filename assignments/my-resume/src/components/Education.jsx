import { useEffect, useState } from "react";
import { fetchEducation } from "../services/api";
import "../App.css";

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetchEducation().then(setEducation);
  }, []);

  return (
    <div className="section">
      <h3>🎓 Education</h3>
      {education.map((edu, index) => (
        <div key={index} className="card">
          <strong>{edu.degree}</strong> at {edu.school} ({edu.year})
        </div>
      ))}
    </div>
  );
};

export default Education;
