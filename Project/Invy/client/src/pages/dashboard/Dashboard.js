import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome-container">
      <h1>Welcome Page</h1>
      <button onClick={() => navigate("/dashboard")}>Let's Get Started</button>
    </div>
  );
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ width: sidebarOpen ? "280px" : "70px" }}>
        <p className="logo">
          <span>I</span>-nvy
        </p>
        <a href="/dashboard" className="icon-a">
          <i className="fa fa-dashboard icons"></i> Dashboard
        </a>
        <a href="/profile" className="icon-a">
          <i className="fa fa-user-circle icons"></i> Profile
        </a>
        <a href="/inventory" className="icon-a">
          <i className="fa fa-tasks icons"></i> Inventory
        </a>
        <a href="/staff" className="icon-a">
          <i className="fa fa-user-plus icons"></i> Staff Management
        </a>
        <a href="/billing" className="icon-a">
          <i className="fa fa-calendar icons"></i> Billing Management
        </a>
        <a href="/login" className="icon-a">
          <i className="fa fa-sign-out icons"></i> Logout
        </a>
      </div>

      <div id="main" style={{ marginLeft: sidebarOpen ? "300px" : "70px" }}>
        <div className="head">
          <span className="nav" onClick={toggleSidebar}>☰ Dashboard</span>
        </div>
        <div className="home-content">
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Current Staff</div>
                <div className="number">18</div>
              </div>
              <i className="fa fa-users" id="cart"></i>
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Sales</div>
                <div className="number">₹15,876</div>
              </div>
              <i className="fa fa-shopping-cart" id="cart"></i>
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Profit</div>
                <div className="number">₹3,316</div>
              </div>
              <i className="fa fa-money" id="cart"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
