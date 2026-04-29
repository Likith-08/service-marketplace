import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "./PaymentPage.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
const bookingData = location.state || JSON.parse(localStorage.getItem("bookingData")) || {};
const [paymentMethod, setPaymentMethod] = useState("cod");

if (!bookingData || Object.keys(bookingData).length === 0) {
  return <h2 style={{ color: "white" }}>No Payment Data</h2>;
}

  const service = bookingData?.service || bookingData;
const booking = bookingData?.booking || bookingData;
  
 const total = Number(
  bookingData?.price || service?.price || 0
) + 99;

 const handlePaymentSelect = (route) => {
  localStorage.setItem("bookingData", JSON.stringify(bookingData));
  navigate(route, { state: bookingData });
};

  return (
    <div className="payment-page">
      <button
          className="back-to-services-btn"
          onClick={() =>
  navigate("/customer/booking", {
    state: { service }
  })
}
        >
          ← Back 
        </button>
      <div className="payment-wrapper">

        <div className="payment-left">
          <div className="payment-header">
            <span className="payment-tag">Payment</span>
            <h1>Choose Payment Method</h1>
            <p>Select your preferred payment option to confirm booking.</p>
          </div>

          <div className="payment-methods">
            <div
              className="payment-card"
                            onClick={() =>
                navigate("/customer/payment/upi", {
                    state: bookingData,
                })
                }
            >
              <h3>UPI Payment</h3>
              <p>Google Pay, PhonePe, Paytm, BHIM</p>
            </div>



            <div
              className="payment-card"
              onClick={() => navigate("/customer/payment/card", { state: bookingData })}
            >
              <h3>Debit / Credit Card</h3>
              <p>Visa, MasterCard, RuPay</p>
            </div>

            <div
              className="payment-card"
              onClick={() => navigate("/customer/payment/netbanking", { state: bookingData })}
            >
              <h3>Net Banking</h3>
              <p>Pay directly using your bank account</p>
            </div>

            <div
              className="payment-card"
              onClick={() => navigate("/customer/payment/wallet", { state: bookingData })}
            >
              <h3>Wallet</h3>
              <p>Amazon Pay, Mobikwik, Freecharge</p>
            </div>

            <div
              className="payment-card"
              onClick={() => navigate("/customer/payment/cod", { state: bookingData })}
            >
              <h3>Cash on Delivery</h3>
              <p>Pay after service completion at your location</p>
            </div>
          </div>
          
        </div>

        <div className="payment-right">
          <div className="summary-box">
  <div className="summary-service-preview">
    <img
      src={
        service?.image ||
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
      }
      alt={service?.title}
    />

    <div className="summary-service-info">
      <span className="summary-service-tag">Selected Service</span>
      <h3>{service?.title || "Professional Service"}</h3>
      <p>{service?.providerName || service?.provider || "Likith"}</p>
    </div>
  </div>

  <h2>Booking Summary:</h2>

  <div className="summary-item">
  <span>Address : </span>
  <strong>
    {bookingData?.address || booking?.address || "Address not provided"}
    {(bookingData?.city || booking?.city)
      ? `, ${bookingData?.city || booking?.city}`
      : ""}
  </strong>
</div>

  <div className="summary-item">
    <span>Date : </span>
    <strong>{booking?.date || "Not Selected"}</strong>
  </div>

  <div className="summary-item">
    <span>Time :</span>
    <strong>{booking?.time || "Not Selected"}</strong>
  </div>

  <div className="summary-item">
    <span>Service Charge :</span>
    <strong>
      {service?.currency || "INR"} {service?.price || 1000}
    </strong>
  </div>

  <div className="summary-item">
    <span>Visiting Charge :</span>
    <strong>{service?.currency || "INR"} 99</strong>
  </div>

  <div className="summary-total">
    <span>Total Amount :</span>
    <h3>
      {service?.currency || "INR"} {total}
    </h3>
  </div>

</div>
        </div>
      </div>
    </div>
  );
}