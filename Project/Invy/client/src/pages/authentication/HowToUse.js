import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HowToUse.css"; 

const HowToUse = () => {
  useEffect(() => {
    const preventBack = () => {
      window.history.forward();
    };
    setTimeout(preventBack, 0);

    window.onunload = () => null;
  }, []);

  return (
    <div className="section">
      <div className="logo" style={{ float: "left", width: "50%" }}>
        <img src="/images/invy.png" alt="Invy Logo" />
      </div>

      <div className="nav-links" id="navlinks" style={{ float: "right", width: "50%" }}>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/login">LOGIN</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </div>

      <br />

      <center>
        <video width="60%" height="40%" controls>
          <source src="/images/invy.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </center>
    </div>
  );
};

export default HowToUse;
