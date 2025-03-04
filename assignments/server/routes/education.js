const express = require("express");
const router = express.Router();

const educationData = [
  {
    id: 1,
    school: "Humber College",
    degree: "Advanced Diploma in Computer Programming & Analysis",
    year: "2022-2025",
  },
  {
    id: 2,
    school: "M.S. University, Baroda",
    degree: "Diploma in Computer Science",
    year: "2019-2022",
  }
];

router.get("/", (req, res) => {
  res.json(educationData);
});

module.exports = router;
