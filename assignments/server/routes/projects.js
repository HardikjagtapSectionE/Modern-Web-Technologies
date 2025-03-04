const express = require("express");
const router = express.Router();

const projects = [
  {
    title: "Quiz Application",
    description: "A React-based quiz app with real-time scoring and analytics.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://github.com/Hardik33/react-IQ",
  },
  {
    title: "Inventory Management System ",
    description: "Invy is a comprehensive supermarket management application designed to streamline and optimize various aspects of supermarket operations.",
    technologies: ["React", "Redux", "Firebase"],
    link: "https://github.com/Hardik33/Invy",
  },
  {
    title: "Gold-E-commerce-website",
    description: "A personal Gold-E-commerce-website to Sell Products like jewellery, necklace, ring.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Hardik33/Gold-E-commerce-website",
  },
];

router.get("/", (req, res) => {
  res.json(projects);
});

module.exports = router;
