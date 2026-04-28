import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLayoutEffect } from "react";
import "./BookingPage.css";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();

console.log("Location State:", location.state);
  const service = location.state?.service || {};
  useLayoutEffect(() => {
  window.scrollTo(0, 0);
}, []);
  

  const [bookingData, setBookingData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    date: "",
    time: "",
    notes: "",
  });
  if (!location.state || !location.state.service) {
  return <h2 style={{ color: "white" }}>No Service Data</h2>;
}

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinue = () => {
    const bookingDetails = {
      serviceTitle: service.title || "Professional Service",
      providerName: service.provider || "Likith",
      price: service.price || 1000,
      currency: service.currency || "INR",
      image: service.image,
      bookingStatus: "confirmed",
      paymentStatus: "pending",
      ...bookingData,
    };

    localStorage.setItem(
      "bookingData",
      JSON.stringify(bookingDetails)
    );

    navigate("/customer/payment", {
      state: bookingDetails,
    });
  };

 return (
  <div className="booking-page">
    <button
          className="back-to-services-btn"
          onClick={() => navigate("/customer/services")}
        >
          ← Back to Services
        </button>
    <div className="booking-container">

      {/* LEFT SIDE */}
      <div className="booking-left">

        {/* BOOKING DETAILS FIRST */}
        <div className="booking-form-card">
          <h2>Booking Details</h2>
          <p>
            Enter your address and preferred service schedule.
          </p>

          <div className="booking-form-grid">
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={bookingData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your mobile number"
                value={bookingData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group full-width">
              <label>Service Address</label>
              <input
                type="text"
                name="address"
                placeholder="House No, Street, Landmark"
                value={bookingData.address}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={bookingData.city}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Preferred Date</label>
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Preferred Time</label>
              <input
                type="time"
                name="time"
                value={bookingData.time}
                onChange={handleChange}
              />
            </div>

            <div className="input-group full-width">
              <label>Additional Notes</label>
              <textarea
                name="notes"
                rows="4"
                placeholder="Any extra details for the service provider..."
                value={bookingData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <button
            className="continue-btn"
            onClick={handleContinue}
          >
            Continue to Payment
          </button>
        </div>

      </div>

      <div className="booking-right">
  <div className="booking-summary-card">
    <div className="summary-service-preview">
      <img
        src={
          service.image ||
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
        }
        alt={service.title}
      />

      <div className="summary-service-text">
        <span className="booking-tag small-tag">Selected Service</span>

        <h3>{service.title || "Professional Service"}</h3>

        <p>{service.provider || "Likith"}</p>
      </div>
    </div>

    <h2>Booking Summary</h2>

    <div className="summary-row">
      <span>Service Charge</span>
      <strong>
        {service.currency || "INR"} {service.price || 1000}
      </strong>
    </div>

    <div className="summary-row">
      <span>Visiting Charge</span>
      <strong>{service.currency || "INR"} 99</strong>
    </div>

    <div className="summary-row">
      <span>Preferred Date</span>
      <strong>{bookingData.date || "Not Selected"}</strong>
    </div>

    <div className="summary-row">
      <span>Preferred Time</span>
      <strong>{bookingData.time || "Not Selected"}</strong>
    </div>

    <div className="summary-row">
      <span>City</span>
      <strong>{bookingData.city || "Not Selected"}</strong>
    </div>

    <div className="summary-total">
      <span>Total Amount</span>
      <h3>
        {service.currency || "INR"}{" "}
        {(Number(service.price) || 1000) + 99}
      </h3>
    </div>
  </div>
</div>
    </div>
  </div>
);
}