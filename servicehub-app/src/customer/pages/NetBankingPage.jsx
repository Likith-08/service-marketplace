import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import "./PaymentMethod.css";

export default function NetBankingPage() {
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

    const res = await fetch(`${BASE_URL}/api/bookings/create`, {
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

paymentMethod: "NetBanking",
paymentStatus: "paid",
bookingStatus: "confirmed"
      }),
    });

    const data = await res.json();
    console.log("API RESPONSE:", data);
  if (data.success) {

    // 👉 STEP 1: Create Razorpay Order
    const orderRes = await fetch(`${BASE_URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: total }),
    });

    const orderData = await orderRes.json();

    // 👉 STEP 2: Open Razorpay
    const options = {
      key: "rzp_test_ShCx8mjfm8GlNa", // your key
      amount: orderData.amount,
      currency: "INR",
      name: "ServiceHub",
      description: "Service Payment",
      order_id: orderData.id,

      handler: function (response) {
        console.log("Payment Success:", response);

        // ✅ NOW navigate after payment
        localStorage.removeItem("bookingData");
        navigate("/customer/booking-success");
      },

      theme: {
        color: "#00f2fe",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

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
          <div className="top-strip bank-strip"></div>

          <div className="method-header">
            <div>
              <span className="small-tag">NET BANKING</span>
              <h1>Pay through Net Banking</h1>
              <p>
                Choose your bank and securely complete the payment through your
                internet banking account.
              </p>
            </div>

            <div className="secure-badge">🏦 Secure Banking</div>
          </div>

          <div className="logo-grid">
            <div className="logo-box">SBI</div>
            <div className="logo-box">HDFC</div>
            <div className="logo-box">ICICI</div>
            <div className="logo-box">Axis</div>
          </div>

          <div className="form-group">
            <label>Select Bank</label>
            <select>
              <option>Select your bank</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra Bank</option>
              <option>Punjab National Bank</option>
              <option>Canara Bank</option>
              <option>Union Bank</option>
            </select>
          </div>

          <div className="form-group">
            <label>Account Holder Name</label>
            <input type="text" placeholder="Enter account holder name" />
          </div>

          <div className="form-group">
            <label>Registered Mobile Number</label>
            <input type="text" placeholder="Enter mobile number" />
          </div>

          <button className="main-pay-btn" onClick={handlePayment}>
            <span>Pay</span>
            <strong>{service.currency} {total}</strong>
          </button>
        </div>

        <div className="summary-card desktop-summary">
          <div className="summary-top">
            <h3>Booking Summary</h3>
            <span className="summary-status">Awaiting Payment</span>
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