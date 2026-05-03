import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import socket from "../socket";
import "./MyBookingsPage.css";
import toast from "react-hot-toast";


export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
const filteredBookings = bookings.filter((b) => {
  const status = (
    b.status ||
    b.bookingStatus ||
    "pending"
  ).toLowerCase();

  if (filter === "all") return true;

  if (filter === "active") {
    return ["pending", "confirmed", "accepted"].includes(status);
  }

  if (filter === "completed") {
    return status === "completed";
  }

  if (filter === "rejected") {
    return status === "rejected";
  }

  return true;
});
  const navigate = useNavigate();
  

  useEffect(() => {
  fetchBookings();
const handleUpdate = (data) => {
  console.log("🔥 RECEIVED:", data);

  // ✅ update only that booking in UI
  setBookings((prev) =>
    prev.map((b) =>
      b._id === data.bookingId
        ? { ...b, bookingStatus: data.status }
        : b
    )
  );

  // ✅ popup
  if (data?.status === "accepted") {
    toast.success("Booking Accepted", {
      duration: 5000, // ⏱️ 5 seconds
    });

  } else if (data?.status === "rejected") {
    toast.error("Booking Rejected");
  } else if (data?.status === "completed") {
    toast.success("Service Completed", {
      duration: 5000,
    });
  }
};

  socket.on("bookingUpdated", handleUpdate);

  return () => {
    socket.off("bookingUpdated", handleUpdate);
  };
}, []);


  const fetchBookings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/bookings`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setBookings(data.reverse());
      } else if (Array.isArray(data.bookings)) {
        setBookings(data.bookings.reverse());
      }
    } catch (error) {
      console.log("Failed to fetch bookings", error);
    }
  };

  const handleDelete = async (id) => {
  console.log("Deleting:", id);

  try {
    const res = await fetch(`${BASE_URL}/api/bookings/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log("Delete response:", data);

    if (!res.ok) {
      console.log("Delete failed on server");
      return;
    }

    setBookings((prev) =>
      prev.filter((booking) => booking._id !== id)
    );

  } catch (error) {
    console.log("Delete failed", error);
  }
};

  return (
    <div className="my-bookings-page">
        <button
          className="back-to-services-btn"
          onClick={() => navigate("/customer/services")}
        >
          ← Back 
        </button>
      <div className="bookings-header">
        <span className="bookings-tag">Your Services</span>
        <h1>My Bookings</h1>
        <p>Track all your confirmed and upcoming service bookings.</p>
      </div>

      <div className="filters">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
        <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>Active</button>
        <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Completed</button>
        <button className={filter === "rejected" ? "active" : ""} onClick={() => setFilter("rejected")}>Rejected</button>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-bookings-card">
          <h2>No bookings found</h2>
          <p>You have not booked any services yet.</p>
          <button onClick={() => navigate("/customer/services")}>Browse Services</button>
        </div>
      ) : (
        <div className="bookings-grid">
          {filteredBookings.map((booking) => {
          const status = (
            booking.status ||
            booking.bookingStatus ||
            "pending"
          ).toString().toLowerCase();

          return (
            <div className="booking-card" key={booking._id}>
              <div className="booking-image-wrapper">
                <img
                  src={
                    booking.image ||
                    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={booking.serviceTitle}
                  className="booking-image"
                />
                <span className={`booking-status ${status}`}>
                  {status === "confirmed"
                    ? "Booked"
                    : status === "accepted"
                    ? "Provider Accepted"
                    : status === "completed"
                    ? "Completed"
                    : status === "rejected"
                    ? "Rejected"
                    : status}
                </span>
              </div>

              <div className="booking-content">
                <div className="booking-top-row">
                  <div>
                    <h2>{booking.serviceTitle || "Professional Service"}</h2>
                    <p className="provider-name">
                      by {booking.providerName || "Likith"}
                    </p>
                  </div>

                  <div className="amount-box">
                    <span>Total Amount</span>
                    <h3>
                      {booking.currency || "INR"} {booking.price || 1000}
                    </h3>
                  </div>
                </div>

                <div className="booking-details-grid">
                  <div className="detail-card">
                    <span>Address</span>
                    <strong>
                      {booking.address
                        ? `${booking.address}, ${booking.city || ""}`
                        : "Address not provided"}
                    </strong>
                  </div>

                  <div className="detail-card">
                    <span>Date</span>
                    <strong>{booking.date || "Not selected"}</strong>
                  </div>

                  <div className="detail-card">
                    <span>Time</span>
                    <strong>{booking.time || "Not selected"}</strong>
                  </div>

                  <div className="detail-card">
                    <span>Payment Method</span>
                    <strong>{booking.paymentMethod || "UPI"}</strong>
                  </div>
                </div>

               <div className="booking-progress">
                  <div className="progress-step">
                    <div className={`step ${[ "confirmed", "accepted", "completed"].includes(status) ? "active" : ""}`}>
                      1
                    </div>
                    <span>Booked</span>
                  </div>

                  <div className={`line ${["accepted", "completed"].includes(status) ? "active" : ""}`}></div>

                  <div className="progress-step">
                    <div className={`step ${["accepted", "completed"].includes(status) ? "active" : ""}`}>
                      2
                    </div>
                    <span>Accepted</span>
                  </div>

                  <div className={`line ${status === "completed" ? "active" : ""}`}></div>

                  <div className="progress-step">
                    <div className={`step ${status === "completed" ? "active" : ""}`}>
                      3
                    </div>
                    <span>Completed</span>
                  </div>
                </div>

                <div className="booking-actions">
                  <span
                    className={`payment-status ${
                      booking.paymentStatus === "paid"
                        ? "paid"
                        : "pending"
                    }`}
                  >
                    {booking.paymentStatus || "pending"}
                  </span>

                  <button
                    className="view-btn"
                   onClick={() =>
                      navigate("/customer/booking-details", {
                        state: { booking }
                      })
                    }
                  >
                    View Details
                  </button>

                  <button
                    className="delete-btn"
                   onClick={() => {
  console.log("Clicked delete", booking._id);
  handleDelete(booking._id);
}}
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
      </div>
    );
  })}
</div>
      )}
    </div>
  );
}