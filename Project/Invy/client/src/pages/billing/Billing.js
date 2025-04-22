import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "./Billing.css";

const Billing = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sid: "",
    sname: "",
    squantity: "",
    srate: "",
    stotal: "",
  });

  const [billItems, setBillItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tax, setTax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [cashPopupVisible, setCashPopupVisible] = useState(false);
  const [cashGiven, setCashGiven] = useState("");
  const [changeAmount, setChangeAmount] = useState(null);

  const toggleSidebar = () => setSidebarExpanded((prev) => !prev);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const calculateTotal = () => {
    const total = parseFloat(formData.squantity || 0) * parseFloat(formData.srate || 0);
    setFormData((prev) => ({ ...prev, stotal: total.toFixed(2) }));
  };

  const handleAddItem = () => {
    const newItem = {
      sid: formData.sid,
      sname: formData.sname,
      squantity: formData.squantity,
      srate: formData.srate,
      stotal: formData.stotal,
    };

    if (editIndex !== null) {
      const updatedItems = [...billItems];
      updatedItems[editIndex] = newItem;
      setBillItems(updatedItems);
      setEditIndex(null);
    } else {
      setBillItems([...billItems, newItem]);
    }

    setFormData({
      ...formData,
      sid: "",
      sname: "",
      squantity: "",
      srate: "",
      stotal: "",
    });
    document.getElementById("billing-overlay").style.display = "none";
  };

  const handleEditItem = (index) => {
    const item = billItems[index];
    setFormData({
      ...formData,
      sid: item.sid,
      sname: item.sname,
      squantity: item.squantity,
      srate: item.srate,
      stotal: item.stotal,
    });
    setEditIndex(index);
    document.getElementById("billing-overlay").style.display = "block";
  };

  const handleDeleteItem = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      setBillItems(billItems.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    const subtotal = billItems.reduce((acc, item) => acc + parseFloat(item.stotal), 0);
    const calculatedTax = (subtotal * 0.13).toFixed(2);
    const calculatedTotal = (subtotal + parseFloat(calculatedTax)).toFixed(2);
    setTax(calculatedTax);
    setTotalAmount(calculatedTotal);
  }, [billItems]);

  const printInvoice = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/billing",
        {
          name: formData.name,
          email: formData.email,
          items: billItems,
          tax,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Invoice saved and inventory updated!");
      }

      const invoiceContent = document.getElementById("invoice").innerHTML;
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = invoiceContent;
      window.print();
      document.body.innerHTML = originalContent;
    } catch (error) {
      console.error("Error printing invoice:", error);
      alert("Failed to save invoice or update inventory.");
    }
  };
  const handleCashPayment = () => setCashPopupVisible(true);

  const handleCashGivenChange = (e) => {
    const value = e.target.value;
    setCashGiven(value);
    const change = parseFloat(value || 0) - parseFloat(totalAmount || 0);
    setChangeAmount(change >= 0 ? change.toFixed(2) : null);
  };

  const closeCashPopup = () => {
    setCashPopupVisible(false);
    setCashGiven("");
    setChangeAmount(null);
  };

  const filteredBillItems = billItems.filter(
    (item) =>
      item.sname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sid.toString().includes(searchQuery)
  );

  const fieldLabels = {
    name: "Your Name",
    email: "Mobile No",
    sid: "Sr No",
    sname: "Product Name",
    squantity: "Quantity",
    srate: "Rate",
    stotal: "Total Amount",
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

      <div id="main">
        <div className="head">
          <span className="nav" onClick={toggleSidebar}>☰ Billing Management</span>
        </div>

        <div className="billing-main-content">
          <div className="billing-search-container">
            <div className="billing-search">
              <input type="text" id="billing-srch" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
              <button type="submit" className="billing-srchbtn"><i className="fa fa-search"></i></button>
            </div>
            <button className="billing-button" onClick={() => document.getElementById("billing-overlay").style.display = "block"}>
              Insert Data
            </button>
          </div>

          {/* Insert Form Popup */}
          <div id="billing-overlay" style={{ display: "none" }}>
            <div id="billing-popup">
              <div className="billing-popup-controls">
                <span id="billing-popupclose" onClick={() => (document.getElementById("billing-overlay").style.display = "none")}>&times;</span>
              </div>
              <div className="billing-popup-content">
                <form onSubmit={(e) => e.preventDefault()}>
                  {["name", "email", "sid", "sname", "squantity", "srate"].map((field) => (
                    <div key={field}>
                      <label>{fieldLabels[field]}*</label><br />
                      <input
                        type="text"
                        id={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onKeyUp={(field === "squantity" || field === "srate") ? calculateTotal : undefined}
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label>{fieldLabels.stotal}*</label><br />
                    <input type="text" id="stotal" value={formData.stotal} readOnly />
                  </div>
                  <div className="billing-form-action-buttons">
                    <button type="button" onClick={handleAddItem}>{editIndex !== null ? "Update" : "Submit"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Billing Table */}
          <div className="container" id="invoice">
            <fieldset>
              <legend>Your Bill</legend>
              <h3>Your Name: <span>{formData.name}</span></h3>
              <h3>Mobile No: <span>{formData.email}</span></h3>
              <table className="list" id="ItemList">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Total Amount</th>
                    <th>⚙</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBillItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.sid}</td>
                      <td>{item.sname}</td>
                      <td>{item.squantity}</td>
                      <td>{item.srate}</td>
                      <td>{item.stotal}</td>
                      <td>
                        <a href="#!" onClick={() => handleEditItem(index)}>Edit</a> / 
                        <a href="#!" onClick={() => handleDeleteItem(index)}>Delete</a>
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
            <button type="button" className="hero-btn">
              <b>Card</b>
            </button>
            <button type="button" className="hero-btn" onClick={handleCashPayment}>
              <b>Cash</b>
            </button>
            <button type="button" className="hero-btn" onClick={printInvoice}>
              <b>Print Invoice</b>
            </button>
          </center>
        </div>
      </div>
      {cashPopupVisible && (
        <div className="cash-popup">
          <div className="cash-popup-content">
            <h3>Enter Cash Given</h3>
            <input
              type="number"
              placeholder="Amount given by customer"
              value={cashGiven}
              onChange={handleCashGivenChange}
            />
            {changeAmount !== null && (
              <p><b>Change to return:</b><b><i>&nbsp;${changeAmount}</i></b></p>
            )}
            <button onClick={closeCashPopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
