import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Importing the updated CSS

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-page-logo" style={{ float: "left", width: "50%" }}>
        <img src="/images/invy.png" alt="Invy Logo" />
      </div>

      <div className="home-page-nav-links" id="navlinks" style={{ float: "right", width: "50%" }}>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/login">LOGIN</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </div>

      <div className="home-page-text-box">
        <h1>Invy</h1>
        <p>Make Your Store a Smart Store.</p><br />
        <p>Transform Traditional Supermarket Management into Virtual Supermarkets</p>

        <Link to="#" className="hero-button">
          <b>Know More</b>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
