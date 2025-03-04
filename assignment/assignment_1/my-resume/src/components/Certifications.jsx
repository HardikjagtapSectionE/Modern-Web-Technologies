import { useEffect, useState } from "react";
import { fetchCertifications } from "../services/api";
import "../App.css";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    fetchCertifications().then(setCertifications);
  }, []);

  return (
    <div className="section">
      <h3>📜 Certifications</h3>
      {certifications.map((cert, index) => (
        <div key={index} className="card">{cert.name} - {cert.year}</div>
      ))}
    </div>
  );
};

export default Certifications;
