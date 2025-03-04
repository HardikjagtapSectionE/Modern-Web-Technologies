import Overview from "./components/Overview";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Overview />
      <Education />
      <Experience />
      <Skills />
      <Certifications />
      <Projects />
    </div>
  );
}

export default App;
