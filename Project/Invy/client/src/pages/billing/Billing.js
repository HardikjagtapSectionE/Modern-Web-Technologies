import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./Billing.css";

const Billing = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sid: '',
    sname: '',
    squantity: '',
    srate: '',
    stotal: ''
  });

  const [billItems, setBillItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tax, setTax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
    const sidebar = document.getElementById("mySidenav");
    const mainContent = document.getElementById("main");
  
    if (sidebar) {
      if (!isSidebarExpanded) {
        sidebar.style.width = "250px";
        mainContent.style.marginLeft = "250px";
      } else {
        sidebar.style.width = "0";
        mainContent.style.marginLeft = "0";
      }
    }
  };
  

  // Handle form data changes
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

  // Add bill item to the list
  const handleAddItem = () => {
    const newItem = {
      sid: formData.sid,
      sname: formData.sname,
      squantity: formData.squantity,
      srate: formData.srate,
      stotal: formData.stotal,
    };
    setBillItems([...billItems, newItem]);
    setFormData({
      ...formData,
      sid: '',
      sname: '',
      squantity: '',
      srate: '',
      stotal: ''
    });
  };

  // Calculate total amount based on quantity and rate
  const calculateTotal = () => {
    const total = parseFloat(formData.squantity) * parseFloat(formData.srate);
    setFormData({
      ...formData,
      stotal: total.toFixed(2),
    });
  };

  // Handle printing of invoice
  const printInvoice = () => {
    const invoiceContent = document.getElementById('invoice').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = invoiceContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

  // Filtered bill items based on search query
  const filteredBillItems = billItems.filter((item) =>
    item.sname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sid.toString().includes(searchQuery)
  );

  // Calculate the total amount with 13% tax
  useEffect(() => {
    const subtotal = billItems.reduce((acc, item) => acc + parseFloat(item.stotal), 0);
    const calculatedTax = (subtotal * 0.13).toFixed(2); // 13% tax
    const calculatedTotal = (subtotal + parseFloat(calculatedTax)).toFixed(2);
    setTax(calculatedTax);
    setTotalAmount(calculatedTotal);
  }, [billItems]); // Recalculate whenever billItems change

  return (
    <div className="dashboard-container">
      <div id="mySidenav" className="sidenav">
        <p className="logo"><span>I</span>-nvy</p>
        <Link to="/dashboard" className="icon-a"><i className="fa fa-dashboard icons"></i> Dashboard</Link>
        <Link to="/profile" className="icon-a"><i className="fa fa-user-circle icons"></i> Profile</Link>
        <Link to="/inventory" className="icon-a"><i className="fa fa-tasks icons"></i> Inventory</Link>
        <Link to="/staff" className="icon-a"><i className="fa fa-user-plus icons"></i> Staff Management</Link>
        <Link to="/billing" className="icon-a"><i className="fa fa-calendar icons"></i> Billing Management</Link>
        <Link to="/login" className="icon-a"><i className="fa fa-sign-out icons"></i> Logout</Link>
      </div>

      <div id="main">
        <div className="head">
          <span className="nav" onClick={toggleSidebar}>☰ Billing Management</span>
        </div>

        <div className="billing-main-content">
          <div className="billing-search-container">
            <div className="billing-search">
              <input
                type="text"
                id="billing-srch"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <button type="submit" className="billing-srchbtn">
                <i className="fa fa-search"></i>
              </button>
            </div>
            <button
              className="billing-button"
              onClick={() => document.getElementById('billing-overlay').style.display = 'block'}
            >
              Insert Data
            </button>
          </div>

          {/* Popup for Insert Data */}
          <div id="billing-overlay" style={{ display: 'none' }}>
            <div id="billing-popup">
              <div className="billing-popup-controls">
                <span
                  id="billing-popupclose"
                  onClick={() => (document.getElementById('billing-overlay').style.display = 'none')}
                >
                  &times;
                </span>
              </div>
              <div className="billing-popup-content">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label>Your Name*</label><br />
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Mobile No*</label><br />
                    <input
                      type="text"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Sr No*</label><br />
                    <input
                      type="text"
                      id="sid"
                      value={formData.sid}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Product Name*</label><br />
                    <input
                      type="text"
                      id="sname"
                      value={formData.sname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Quantity*</label><br />
                    <input
                      type="text"
                      id="squantity"
                      value={formData.squantity}
                      onChange={handleChange}
                      required
                      onKeyUp={calculateTotal}
                    />
                  </div>
                  <div>
                    <label>Rate*</label><br />
                    <input
                      type="text"
                      id="srate"
                      value={formData.srate}
                      onChange={handleChange}
                      required
                      onKeyUp={calculateTotal}
                    />
                  </div>
                  <div>
                    <label>Total amount*</label><br />
                    <input
                      type="text"
                      id="stotal"
                      value={formData.stotal}
                      readOnly
                    />
                  </div>
                  <div className="billing-form-action-buttons">
                    <button type="button" onClick={handleAddItem}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Billing Table */}
          <div className="container" id="invoice">
            <fieldset>
            <legend>Your Bill</legend>
              <h3>Your Name: <span id="name2">{formData.name}</span></h3>
              <h3>Mobile No: <span id="email2">{formData.email}</span></h3>
              <table className="list" id="ItemList">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Total Amount</th>
                    <th><span>&#9881;</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBillItems.map((item) => (
                    <tr key={item.sid}>
                      <td>{item.sid}</td>
                      <td>{item.sname}</td>
                      <td>{item.squantity}</td>
                      <td>{item.srate}</td>
                      <td>{item.stotal}</td>
                      <td>
                        <a href="#!" onClick={() => console.log('Edit item')}>Edit</a> / 
                        <a href="#!" onClick={() => console.log('Delete item')}>Delete</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            

            <div className="checkout">
              <h4>Amount: <span>{billItems.reduce((acc, item) => acc + parseFloat(item.stotal), 0).toFixed(2)}</span></h4>
              <h4>Tax (13%): <span>{tax}</span></h4>
              <h4>Total Amount: <span>{totalAmount}</span></h4>
            </div>

            <div className="thanks">
              <center><p>Thank you sincerely for your kind visit.</p></center>
            </div>
            </fieldset>
          </div>

          <center>
            <button type="button" className="hero-btn" onClick={printInvoice}>
              <b>Print Invoice</b>
            </button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Billing;
