import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import HomePage from "./pages/authentication/HomePage";
import HowToUse from "./pages/authentication/HowToUse";
import About from "./pages/authentication/About";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Contact from "./pages/authentication/Contact";
import Welcome from "./pages/authentication/Welcome";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HowToUse" element={<HowToUse />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Welcome" element={<Welcome />} />

      </Routes>
    </Router>
  );
}

export default App;
