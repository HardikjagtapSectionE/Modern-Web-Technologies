import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; 

const HomePage = () => {
  return (
    <div className="home-section">
      <div className="home-logo" style={{ float: "left", width: "50%" }}>
        <img src="/images/invy.png" alt="Invy Logo" />
      </div>

      <div className="home-nav-links" id="navlinks" style={{ float: "right", width: "50%" }}>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/login">LOGIN</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </div>

      <div className="home-text-box">
        <h1>Invy</h1>
        <p>Make Your Store a Smart Store.</p>
        <p>Transform Traditional Supermarket Management into Virtual Supermarkets</p>

        <Link to="/HowToUse" className="hero-btn">
          <b>How To Use</b>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
