import React from "react";
import { Link } from "react-router-dom";
import "./About.css"; 

const About = () => {
  return (
    <div className="about-section">
      <div className="about-logo" style={{ float: "left", width: "50%" }}>
        <img src="/images/invy.png" alt="Invy Logo" />
      </div>

      <div className="about-nav-links" id="about-navlinks" style={{ float: "right", width: "50%" }}>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/login">LOGIN</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </div>

      <div className="about-text-box">
        <h1>About Us</h1>
        <div className="aboutus-paragraph">
          <p>
            Invy is the system where all the aspects related to the proper
            management of supermarkets are done. These aspects involve managing
            information about the various products, staff, managers, customers,
            billing etc. This system provides an efficient way of managing the
            supermarket information. Also allows the customer to purchase and
            pay for the items purchased.
          </p>
        </div>
      </div>

      {/* SECTION: FEATURES */}
      <div className="about-feature">
        <div className="about-text-box1">
          <h1>Features of Invy</h1>
        </div>

        <div className="about-cards">
          <div className="about-card about-card-1">
            <div className="about-card-picture-section">
              <div className="about-card-picture" style={{ float: "left", width: "50%" }}>
                <img src="./images/manager.png" alt="Manager Feature" />
              </div>
            </div>
            <div className="about-card-title">
              <h4>Monitoring of Net-Income to maintain all records.</h4>
            </div>
          </div>

          <div className="about-card about-card-2">
            <div className="about-card-picture-section">
              <div className="about-card-picture" style={{ float: "left", width: "50%" }}>
                <img src="./images/stock.jpg" alt="Stock Feature" />
              </div>
            </div>
            <div className="about-card-title">
              <h4>
                Inspects Stock of the Products. Add or Remove Item from Data.
                Maintain Data of Purchase and Sold.
              </h4>
            </div>
          </div>

          <div className="about-card about-card-3">
            <div className="about-card-picture-section">
              <div className="about-card-picture" style={{ float: "left", width: "50%" }}>
                <img src="./images/staff.jpg" alt="Staff Feature" />
              </div>
            </div>
            <div className="about-card-title">
              <h4>Maintain Attendance of Staff Track Records</h4>
            </div>
          </div>

          <div className="about-card about-card-4">
            <div className="about-card-picture-section">
              <div className="about-card-picture" style={{ float: "left", width: "50%" }}>
                <img src="./images/biller.jpg" alt="Biller Feature" />
              </div>
            </div>
            <div className="about-card-title">
              <h4>Manage add to Cart. Print Receipt.</h4>
            </div>
          </div>
        </div>
      </div>     
    </div>
  );
};

export default About;
