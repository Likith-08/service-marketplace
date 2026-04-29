import { useNavigate } from "react-router-dom";
import "./BookingSuccessPage.css";
import { useEffect } from "react";
export default function BookingSuccessPage() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="success-page">
      <div className="background-glow glow-1"></div>
      <div className="background-glow glow-2"></div>

      <button
        className="back-to-services-btn"
        onClick={() => navigate("/customer/services")}
      >
        ← Back 
      </button>

      <div className="success-card">
        <div className="success-icon-ring">
          <div className="success-icon">✓</div>
        </div>

        <div className="success-badge">PAYMENT SUCCESSFUL</div>

        <h1>Booking Confirmed!</h1>

        <p>
          Your payment has been completed successfully and your service request
          is now confirmed. The professional will review your booking and
          contact you shortly with the next steps.
        </p>

        <div className="success-info-grid">
          <div className="info-box">
            <span>Status</span>
            <strong>Confirmed</strong>
          </div>

          <div className="info-box">
            <span>Response Time</span>
            <strong>Within 30 mins</strong>
          </div>

          <div className="info-box">
            <span>Payment</span>
            <strong>Received</strong>
          </div>
        </div>

        <div className="success-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/customer/services")}
          >
            Explore More Services
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/customer/my-bookings")}
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}