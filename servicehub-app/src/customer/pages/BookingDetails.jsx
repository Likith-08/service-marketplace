import { useLocation, useNavigate } from "react-router-dom";
import "./BookingDetails.css";

export default function BookingDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;

  if (!booking) {
    return <h2 style={{ color: "white" }}>No Booking Found</h2>;
  }

  const status = (booking.bookingStatus || "pending").toLowerCase();

  return (
    <div className="details-page">

  <button className="back-btn" onClick={() => navigate("/customer/my-bookings")}>
    ← Back
  </button>

  <div className="details-header">
    <h1>Booking Details</h1>
    <p>Track your service booking in detail</p>
  </div>

  <div className="details-card">

    <div className="details-top">
      <h2>{booking.serviceTitle}</h2>
      <span className={`status-badge ${booking.bookingStatus}`}>
        {booking.bookingStatus}
      </span>
    </div>

    <div className="details-grid">

      <div className="info-box">
        <span>Provider</span>
        <h4>{booking.providerName}</h4>
      </div>

      <div className="info-box highlight">
        <span>Price</span>
        <h4>₹{booking.price}</h4>
      </div>

      <div className="info-box">
        <span>Date</span>
        <h4>{booking.date}</h4>
      </div>

      <div className="info-box">
        <span>Time</span>
        <h4>{booking.time}</h4>
      </div>

      <div className="info-box">
        <span>Payment</span>
        <h4>{booking.paymentMethod}</h4>
      </div>

    </div>

    <div className="address-box">
      <span>Address</span>
      <p>{booking.address}</p>
    </div>

  </div>
</div>


  );
}