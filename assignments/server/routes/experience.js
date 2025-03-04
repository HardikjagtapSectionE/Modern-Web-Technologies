const express = require("express");
const router = express.Router();

const experienceData = [
  {
    id: 1,
    company: "Dynamisch PVT LTD",
    role: "Software Engineer",
    year: "2024-Present",
  },
  {
    id: 2,
    company: "Web Solutions",
    role: "Frontend Developer",
    year: "2022-2024",
  }
];

router.get("/", (req, res) => {
  res.json(experienceData);
});

module.exports = router;
