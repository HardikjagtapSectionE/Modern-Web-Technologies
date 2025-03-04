const express = require("express");
const router = express.Router();

const skillsData = [
  "JavaScript",
  "Java",
  "Python",
  "React-Native",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "firebase",
  "AWS",
  "Microsoft Azure",
  "HTML5",
  "CSS",
  "Git"
];

router.get("/", (req, res) => {
  res.json(skillsData);
});

module.exports = router;
