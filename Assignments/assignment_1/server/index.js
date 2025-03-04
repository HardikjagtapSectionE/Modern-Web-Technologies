const express = require("express");
const cors = require("cors");

const education = require("./routes/education");
const experience = require("./routes/experience");
const overview = require("./routes/overview");
const skills = require("./routes/skills");
const certifications = require("./routes/certifications");
const projects = require("./routes/projects");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/getEdu", education);
app.use("/getExp", experience);
app.use("/getOverview", overview);
app.use("/getSkills", skills);
app.use("/getCertifications", certifications);
app.use("/getProjects", projects);


app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.use((req, res) => {
  res.status(404).send(`No request for ${req.url} exists`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
