import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./Staff.css";

const Staff = () => {
  const [staffData, setStaffData] = useState([]);
  const [formData, setFormData] = useState({
    sid: '',
    sname: '',
    sattnd: '',
  });
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  const token = localStorage.getItem("token");

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  // Load staff from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/staff", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setStaffData(res.data))
    .catch((err) => console.error("Error loading staff:", err));
  }, [token]);

  // Handle form input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle search
  const handleSearch = (e) => setSearchQuery(e.target.value);

  // Filter staff data
  const filteredStaffData = staffData.filter(item =>
    item.sname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sid.toString().includes(searchQuery)
  );

  // Handle submit (add/update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedId) {
        // Update staff
        await axios.put(`http://localhost:5000/api/staff/${selectedId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create staff
        await axios.post("http://localhost:5000/api/staff", formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      // Refresh data
      const res = await axios.get("http://localhost:5000/api/staff", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStaffData(res.data);
      resetForm();
      document.getElementById('staff-overlay').style.display = 'none';
    } catch (err) {
      console.error("Error saving staff:", err);
      alert("Failed to save staff");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ sid: '', sname: '', sattnd: '' });
    setSelectedId(null);
  };

  // Edit staff
  const onEdit = (staff) => {
    setFormData(staff);
    setSelectedId(staff._id);
    document.getElementById('staff-overlay').style.display = 'block';
  };

  // Delete staff
  const onDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/staff/${_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStaffData(staffData.filter(item => item._id !== _id));
      } catch (err) {
        console.error("Error deleting staff:", err);
        alert("Failed to delete staff");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div id="mySidenav" className={`sidenav ${isSidebarExpanded ? "" : "collapsed"}`}>
        <p className="logo"><span>I</span>-nvy</p>
        <Link to="/dashboard" className="icon-a"><i className="fa fa-dashboard icons"></i> Dashboard</Link>
        <Link to="/profile" className="icon-a"><i className="fa fa-user-circle icons"></i> Profile</Link>
        <Link to="/inventory" className="icon-a"><i className="fa fa-tasks icons"></i> Inventory</Link>
        <Link to="/staff" className="icon-a"><i className="fa fa-user-plus icons"></i> Staff Management</Link>
        <Link to="/billing" className="icon-a"><i className="fa fa-calendar icons"></i> Billing Management</Link>
        <Link to="/login" className="icon-a"><i className="fa fa-sign-out icons"></i> Logout</Link>
      </div>

      <div id="main" className={isSidebarExpanded ? "" : "collapsed"}>
        <div className="head">
          <span className="nav" onClick={toggleSidebar}>☰ Staff Management</span>
        </div>

        <div className="staff-main-content">
          {/* Search + Insert */}
          <div className="staff-search-container">
            <div className="staff-search">
              <input
                type="text"
                id="staff-srch"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <button type="submit" className="staff-srchbtn">
                <i className="fa fa-search"></i>
              </button>
            </div>
            <button
              className="staff-button"
              onClick={() => document.getElementById('staff-overlay').style.display = 'block'}
            >
              Insert Data
            </button>
          </div>

          {/* Popup Modal */}
          <div id="staff-overlay" style={{ display: 'none' }}>
            <div id="staff-popup">
              <div className="staff-popup-controls">
                <span onClick={() => document.getElementById('staff-overlay').style.display = 'none'}>
                  &times;
                </span>
              </div>
              <div className="staff-popup-content">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <label>Staff ID</label>
                  <input
                    type="text"
                    id="sid"
                    value={formData.sid}
                    onChange={handleChange}
                    required
                    disabled={selectedId !== null}
                  />
                  <label>Staff Name</label>
                  <input
                    type="text"
                    id="sname"
                    value={formData.sname}
                    onChange={handleChange}
                    required
                  />
                  <label>Staff Attendance</label>
                  <input
                    type="datetime-local"
                    id="sattnd"
                    value={formData.sattnd}
                    onChange={handleChange}
                    required
                  />
                  <div className="staff-form-action-buttons">
                    <button type="submit">{selectedId ? "Update" : "Submit"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="staff-list" id="staff-ItemList">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Staff Name</th>
                <th>Staff Attendance</th>
                <th><span id="inventory-set">&#9881;</span></th>
              </tr>
            </thead>
            <tbody>
            {[...filteredStaffData].sort((a, b) => a.sid.localeCompare(b.sid)).map((item) => (
                <tr key={item._id}>
                  <td>{item.sid}</td>
                  <td>{item.sname}</td>
                  <td>{item.sattnd}</td>
                  <td>
                    <a href="#!" onClick={() => onEdit(item)}>Edit</a> /
                    <a href="#!" onClick={() => onDelete(item._id)}>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Staff;
