import React, { useState } from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./dashboard.css"; // Ensure this file remains the same
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  // Define toggleDataSeries function above chartOptions
  const toggleDataSeries = (e) => {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  };

  const chartOptions = {
    animationEnabled: true,
    title: {
      text: "Monthly Sales Data",
    },
    axisX: {
      valueFormatString: "MMM",
    },
    axisY: {
      prefix: "₹",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries, // This should now be defined
    },
    data: [
      {
        type: "column",
        name: "Sales",
        showInLegend: true,
        xValueFormatString: "MMMM YYYY",
        yValueFormatString: "₹#,##0",
        dataPoints: [
          { x: new Date(2022, 0), y: 20000 },
          { x: new Date(2022, 1), y: 30000 },
          { x: new Date(2022, 2), y: 25000 },
          { x: new Date(2022, 3), y: 70000, indexLabel: "High Renewals" },
          { x: new Date(2022, 4), y: 50000 },
          { x: new Date(2022, 5), y: 35000 },
          { x: new Date(2022, 6), y: 30000 },
          { x: new Date(2022, 7), y: 43000 },
          { x: new Date(2022, 8), y: 35000 },
          { x: new Date(2022, 9), y: 30000 },
          { x: new Date(2022, 10), y: 40000 },
          { x: new Date(2022, 11), y: 50000 },
        ],
      },
      {
        type: "area",
        name: "Profit",
        markerBorderColor: "white",
        markerBorderThickness: 2,
        showInLegend: true,
        yValueFormatString: "₹#,##0",
        dataPoints: [
          { x: new Date(2022, 0), y: 5000 },
          { x: new Date(2022, 1), y: 7000 },
          { x: new Date(2022, 2), y: 6000 },
          { x: new Date(2022, 3), y: 30000 },
          { x: new Date(2022, 4), y: 20000 },
          { x: new Date(2022, 5), y: 15000 },
          { x: new Date(2022, 6), y: 13000 },
          { x: new Date(2022, 7), y: 20000 },
          { x: new Date(2022, 8), y: 15000 },
          { x: new Date(2022, 9), y: 10000 },
          { x: new Date(2022, 10), y: 19000 },
          { x: new Date(2022, 11), y: 22000 },
        ],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div id="mySidenav" className={`sidenav ${isSidebarExpanded ? "" : "collapsed"}`}>
        <p className="logo">
          <span>I</span>-nvy
        </p>
        <Link to="/dashboard" className="icon-a">
          <i className="fa fa-dashboard icons"></i> Dashboard
        </Link>
        <Link to="/profile" className="icon-a">
          <i className="fa fa-user-circle icons"></i> Profile
        </Link>
        <Link to="/inventory" className="icon-a">
          <i className="fa fa-tasks icons"></i> Inventory
        </Link>
        <Link to="/staff" className="icon-a">
          <i className="fa fa-user-plus icons"></i> Staff Management
        </Link>
        <Link to="/billing" className="icon-a">
          <i className="fa fa-calendar icons"></i> Billing Management
        </Link>
        <Link to="/login" className="icon-a">
          <i className="fa fa-sign-out icons"></i> Logout
        </Link>
      </div>

      {/* Main Content */}
      <div id="main" className={isSidebarExpanded ? "" : "collapsed"}>
        <div className="head">
          <div className="col-div-6">
            <span className="nav" onClick={toggleSidebar}>
              ☰ Dashboard
            </span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="home-content">
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Staff</div>
                <div className="number">20</div>
              </div>
              <i className="fa fa-users" id="cart"></i>
            </div>

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

            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Loss</div>
                <div className="number">₹873</div>
              </div>
              <i className="fa fa-money" id="cart"></i>
            </div>

            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Stock</div>
                <div className="number">500</div>
              </div>
              <i className="fa fa-tasks icons" id="cart"></i>
            </div>

            <div className="box">
              <div className="right-side">
                <div className="box-topic">Remaining Stock</div>
                <div className="number">210</div>
              </div>
              <i className="fa fa-cart-arrow-down" id="cart"></i>
            </div>

            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Invoice</div>
                <div className="number">24</div>
              </div>
              <i className="fa fa-file-pdf-o" id="cart"></i>
            </div>
          </div>

          {/* Chart (Moved below the boxes) */}
          <div id="chartContainer" style={{ height: "300px", width: "100%" }}>
            <CanvasJSChart options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
