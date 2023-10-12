import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./OrderPrint.css"; // Import a CSS file for styling (create this file)
import QRCode from "qrcode.react";

function OrderPrint() {
  const location = useLocation();
  const { orderDatas } = location.state;
  const qrCodeData = orderDatas._id; // Data to be encoded in the QR code
  // const orderUrl = `${window.location.href}`;
  const sender = orderDatas?.sender || {}; // Assuming sender details are inside 'sender' object

  // Create a ref for the QR code component
  const qrCodeRef = useRef(null);

  useEffect(() => {
    // Generate the QR code when the component mounts
    if (qrCodeRef.current) {
      qrCodeRef.current.toDataURL(qrCodeData, (err, url) => {
        if (err) {
          console.error("Error generating QR code:", err);
        } else {
          // Set the generated QR code URL as an attribute on the image
          qrCodeRef.current.src = url;
        }
      });
    }
  }, [qrCodeData]);

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div>
          <h1>Invoice</h1>
          <p>Order Number: {orderDatas._id}</p>
        </div>
        <div className="qr-code-container">
          <QRCode
            ref={qrCodeRef}
            value={qrCodeData}
            size={150}
            level="H" // Adjust the error correction level as needed
          />
        </div>
      </div>
      {/* <h3>Sender Details</h3>
      <table className="invoice-table">
        <tbody>
          <tr>
            <td>Email:</td>
            <td>{sender.email || "N.A."}</td>
          </tr>
          <tr>
            <td>City:</td>
            <td>{sender.city || "N.A."}</td>
          </tr>
          <tr>
            <td>Street Address:</td>
            <td>{orderDatas.street || "N.A."}</td>
          </tr>
          <tr>
            <td>Postal Code:</td>
            <td>{orderDatas.postalCode || "N.A."}</td>
          </tr>
        </tbody>
      </table> */}

      <div className="invoice-details">
        <div className="invoice-section">
          <h3>Order Details</h3>
          <table className="invoice-table">
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{orderDatas.name}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{orderDatas.email}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{orderDatas.phone}</td>
              </tr>
              <tr>
                <td>Alternate Phone:</td>
                <td>{orderDatas.APhone || "N.A."}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{orderDatas.city}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{orderDatas.country}</td>
              </tr>
              <tr>
                <td>Street Address:</td>
                <td>{orderDatas.street}</td>
              </tr>
              <tr>
                <td>Postal Code:</td>
                <td>{orderDatas.postalCode}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="invoice-section">
          <h3>Line Items</h3>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price (Per Unit)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDatas.line_items.map((item, index) => (
                <tr key={index}>
                  <td>{item.price_data.product_data.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price_data.unit_amount}</td>
                  <td>₹{item.quantity * item.price_data.unit_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="invoice-total">
        {orderDatas.paid && <p>Paid Order</p>}
        {!orderDatas.paid && <p>Total Amount: ₹{orderDatas.total}</p>}
      </div>
    </div>
  );
}

export default OrderPrint;
