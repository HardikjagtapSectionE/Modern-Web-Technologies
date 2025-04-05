import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import HomePage from "./pages/authentication/HomePage";
import About from "./pages/authentication/About";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Contact from "./pages/authentication/Contact";
import Welcome from "./pages/authentication/Welcome";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Inventory from "./pages/inventory/Inventory";
import Staff from "./pages/staff/Staff";
import Billing from "./pages/billing/Billing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
