import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getProjects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleViewProject = (projectId) => {
    console.log(`Viewing project with ID: ${projectId}`);
  };

  return (
    <div className="section">
      <h3>📂 Projects</h3>
      {projects.map((project, index) => (
        <div key={index} className="card">
          <h4 className="project-title">{project.title}</h4>
          <p>{project.description}</p>
          <p><strong>Technologies:</strong> {project.technologies.join(", ")}</p>
          <button className="view-project-button" onClick={() => handleViewProject(project.id)}>View Project</button>
        </div>
      ))}
    </div>
  );
};

export default Projects;
