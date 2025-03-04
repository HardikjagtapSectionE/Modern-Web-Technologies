const express = require("express");
const router = express.Router();

const certificationsData = [
  {
    id: 1,
    name: "AWS Certified Developer",
    year: "2023"
  },
  {
    id: 2,
    name: "Microsoft Certified: Azure Fundamentals",
    year: "2022"
  },
  {
    id: 3,
    name: "Google Cloud Professional Cloud Architect",
    year: "2021"
  }
];

router.get("/", (req, res) => {
  res.json(certificationsData);
});

module.exports = router;
