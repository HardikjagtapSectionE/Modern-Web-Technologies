import React, { useState } from "react";
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
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarExpanded, setSidebarExpanded] = useState(true); // Added state for sidebar

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  // Handle form data change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle search query change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered staff data based on search
  const filteredStaffData = staffData.filter((item) =>
    item.sname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sid.toString().includes(searchQuery)  // Convert sid to string for comparison
  );

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // If staff ID is not provided, generate one
    if (!formData.sid) {
      formData.sid = Date.now();  // Generate unique ID if not provided
    }

    if (selectedRow) {
      // If editing, update the staff data
      setStaffData(
        staffData.map((item) =>
          item.sid === selectedRow.sid ? { ...formData } : item
        )
      );
    } else {
      // If adding new, add the staff data
      setStaffData([...staffData, { ...formData }]);
    }

    resetForm();
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      sid: '',
      sname: '',
      sattnd: '',
    });
    setSelectedRow(null);
  };

  // Handle editing of a staff member
  const onEdit = (sid) => {
    const item = staffData.find((item) => item.sid === sid);
    setFormData(item);  // Pre-fill the form with the existing data
    setSelectedRow(item); // Mark the row as selected for editing
    document.getElementById('staff-overlay').style.display = 'block'; // Open the modal for editing
  };

  // Handle deletion of a staff member
  const onDelete = (sid) => {
    if (window.confirm('Are you sure to delete this record?')) {
      setStaffData(staffData.filter((item) => item.sid !== sid));
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
          {/* Staff Search and Insert Button in One Line */}
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

          {/* Popup for Insert or Edit Data */}
          <div id="staff-overlay" style={{ display: 'none' }}>
            <div id="staff-popup">
              <div className="staff-popup-controls">
                <span
                  id="staff-popupclose"
                  onClick={() => (document.getElementById('staff-overlay').style.display = 'none')}
                >
                  &times;
                </span>
              </div>
              <div className="staff-popup-content">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div>
                    <label>Staff ID</label><br />
                    <input
                      type="text"
                      id="sid"
                      value={formData.sid}
                      onChange={handleChange}
                      required
                      disabled={selectedRow !== null} // Disable ID field when editing
                    />
                  </div>
                  <div>
                    <label>Staff Name</label><br />
                    <input
                      type="text"
                      id="sname"
                      value={formData.sname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Staff Attendance</label><br />
                    <input
                      type="datetime-local"
                      id="sattnd"
                      value={formData.sattnd}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="staff-form-action-buttons">
                    <button type="submit">
                      {selectedRow ? 'Update' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Staff Table */}
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
              {filteredStaffData.map((item) => (
                <tr key={item.sid}>
                  <td>{item.sid}</td>
                  <td>{item.sname}</td>
                  <td>{item.sattnd}</td>
                  <td>
                    <a href="#!" onClick={() => onEdit(item.sid)}>Edit</a> / 
                    <a href="#!" onClick={() => onDelete(item.sid)}>Delete</a>
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
