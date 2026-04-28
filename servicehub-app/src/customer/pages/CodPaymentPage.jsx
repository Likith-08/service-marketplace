import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentMethod.css";

export default function CodPaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData =
    location.state ||
    JSON.parse(localStorage.getItem("bookingData")) ||
    {};
  if (!bookingData || Object.keys(bookingData).length === 0) {
  return <h2>No Data</h2>;
}

  const service = bookingData.service || bookingData;
  const booking = bookingData.booking || bookingData;

  const total = Number(service.price || 0) + 99;

  const handlePayment = async () => {
  try {
    const bookingData =
      JSON.parse(localStorage.getItem("bookingData")) || {};

    const service = bookingData.service || {};
    const booking = bookingData.booking || {};

    const res = await fetch("http://localhost:5000/api/bookings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceTitle:
  bookingData?.serviceTitle || service?.title,

providerName:
  bookingData?.providerName || service?.provider || "Likith",

image:
  bookingData?.image || service?.image,

price:
  bookingData?.price || service?.price || 1000,

currency:
  bookingData?.currency || service?.currency || "INR",

fullName:
  bookingData?.fullName || booking?.fullName,

phone:
  bookingData?.phone || booking?.phone,

address:
  bookingData?.address || booking?.address,

city:
  bookingData?.city || booking?.city,

date:
  bookingData?.date || booking?.date,

time:
  bookingData?.time || booking?.time,

notes:
  bookingData?.notes || booking?.notes,

paymentMethod: "COD",
paymentStatus: "paid",
bookingStatus: "confirmed"
      }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.removeItem("bookingData");
      navigate("/customer/booking-success");
    } else {
      alert("Booking failed");
    }
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};

  return (
    <div className="method-page">
      <button
          className="back-to-payment-btn"
          onClick={() => navigate("/customer/payment")}
        >
          ← Back 
        </button>
      <div className="method-wrapper">
        <div className="method-card glass-card">
          <div className="top-strip cod-strip"></div>

          <div className="method-header">
            <div>
              <span className="small-tag">CASH ON DELIVERY</span>
              <h1>Pay After Service Completion</h1>
              <p>
                You can pay directly to the professional once the service is
                completed at your location.
              </p>
            </div>

            <div className="secure-badge">💵 Cash Payment</div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "22px",
              marginBottom: "24px",
            }}
          >
            <h3
              style={{
                color: "#fff",
                marginBottom: "14px",
                fontSize: "22px",
              }}
            >
              Important Instructions
            </h3>

            <ul
              style={{
                color: "#cbd5e1",
                lineHeight: "1.9",
                paddingLeft: "18px",
              }}
            >
              <li>Please keep the exact amount ready.</li>
              <li>Payment should be made only after service completion.</li>
              <li>Collect your payment receipt from the professional.</li>
              <li>
                Additional charges may apply only if extra work is requested.
              </li>
            </ul>
          </div>

          <div className="form-group">
            <label>Preferred Payment Mode at Home</label>
            <select>
              <option>Cash</option>
              <option>Card Machine</option>
              <option>UPI to Professional</option>
            </select>
          </div>

          <div className="form-group">
            <label>Special Instructions</label>
            <textarea
              rows="4"
              placeholder="Any instructions for the professional..."
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                resize: "none",
              }}
            />
          </div>

          <button className="main-pay-btn" onClick={handlePayment}>
            <span>Pay</span>
            <strong>{service.currency} {total}</strong>
          </button>
        </div>

        <div className="summary-card desktop-summary">
          <div className="summary-top">
            <h3>Booking Summary</h3>
            <span className="summary-status">Payment Pending</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Service</span>
            <p className="summary-value">{service.title}</p>
          </div>

          <div className="summary-item">
            <span className="summary-label">Professional</span>
            <p className="summary-value">{service.providerName}</p>
          </div>

          <div className="summary-item">
            <span className="summary-label">Address</span>
            <p className="summary-value">
              {booking.address}, {booking.city}
            </p>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-price-row">
            <span>Service Charge</span>
            <strong>
              {service.currency} {service.price}
            </strong>
          </div>

          <div className="summary-price-row">
            <span>Visiting Charge</span>
            <strong>{service.currency} 99</strong>
          </div>

          <div className="summary-total">
            <span>Total Amount</span>
            <h2>
              {service.currency} {total}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}