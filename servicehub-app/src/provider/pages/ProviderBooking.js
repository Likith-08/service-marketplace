import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import socket from "../utils/socket";
import "./ProviderBooking.css";

export default function ProviderBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);
  
  useEffect(() => {
  socket.on("bookingUpdated", (data) => {
    setBookings((prev) =>
      prev.map((b) =>
        b._id === data.bookingId
          ? { ...b, bookingStatus: data.status }
          : b
      )
    );
  });

  return () => {
    socket.off("bookingUpdated");
  };
}, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/bookings`);
      const data = await res.json();

      const bookingList = Array.isArray(data)
        ? data
        : data.bookings || [];

      setBookings(bookingList.reverse());
    } catch (err) {
      console.log("Failed to load bookings", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/bookings/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingStatus: status }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === id
              ? { ...booking, bookingStatus: status, status:status, }
              : booking
          )
        );
      }
    } catch (err) {
      console.log("Failed to update status", err);
    }
  };

  const deleteBooking = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/bookings/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    }
  } catch (err) {
    console.log("Failed to delete booking", err);
  }
};

  return (
    <div className="provider-bookings-page">
      <button
          className="back-to-services-btn"
          onClick={() => navigate("/provider/services")}
        >
          ← Back 
        </button>
      <div className="provider-header">
        <div>
          <span className="provider-bookings-tag">Provider Dashboard</span>
          <h1>Provider Dashboard</h1>
          <p>View and manage all incoming service requests.</p>
        </div>

        <div className="provider-stats-mini">
          <div className="mini-card">
            <span>{bookings.length}</span>
            <p>Total</p>
          </div>

          <div className="mini-card">
            <span>
              {
                bookings.filter((b) => {
                  const status = (
                    b.bookingStatus ||
                    b.status ||
                    "booked"
                  ).toString().toLowerCase();

                  return (
                    status === "booked" ||
                    status === "pending" ||
                    status === "confirmed"
                  );
                }).length
              }
            </span>
            <p>Pending</p>
          </div>
          <div className="mini-card">
            <span>
              {
                bookings.filter((b) => {
                  const status = (
                    b.bookingStatus ||
                    b.status ||
                    ""
                  ).toString().toLowerCase();

                  return status === "accepted";
                }).length
              }
            </span>
            <p>accepted</p>
          </div>
          <div className="mini-card">
            <span>
              {
                bookings.filter((b) => {
                  const currentStatus = (
                    b.status ||
                    b.bookingStatus ||
                    ""
                  ).toString().toLowerCase();

                  return currentStatus === "completed";
                }).length
              }
            </span>
            <p>Completed</p>
          </div>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="provider-empty-card">
          <h2>No Bookings Yet</h2>
          <p>New customer bookings will appear here.</p>
        </div>
      ) : (
        <div className="provider-bookings-grid">
          {bookings.map((booking) => {
              const status = (
                  booking.bookingStatus ||
                  booking.status ||
                  "booked"
                )
                  .toString()
                  .trim()
                  .toLowerCase();

            return (
              <div className="provider-booking-card" key={booking._id}>
                <div className="provider-booking-image-wrapper">
                  <img
                    src={
                      booking.image ||
                      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={booking.serviceTitle}
                    className="provider-booking-image"
                  />

                  <span className={`provider-status ${status}`}>
                    {status}
                  </span>
                </div>

                <div className="provider-booking-content">
                  <div className="provider-booking-top">
                    <div>
                      <h2>{booking.serviceTitle || "Professional Service"}</h2>
                      <p className="provider-name">
                        Customer: {booking.customerName || booking.fullName}
                      </p>
                    </div>

                    <div className="provider-amount-box">
                      <span>Total Amount</span>
                      <h3>
                        {booking.currency || "INR"} {booking.price || 1000}
                      </h3>
                    </div>
                  </div>

                  <div className="provider-details-grid">
                    <div className="provider-detail-card full-width">
                      <span>Address</span>
                      <strong>
                        {booking.address
                          ? `${booking.address}, ${booking.city || ""}`
                          : "Address not provided"}
                      </strong>
                    </div>

                    <div className="provider-detail-card">
                      <span>Phone Number</span>
                      <strong>{booking.phone || "Not Provided"}</strong>
                    </div>

                    <div className="provider-detail-card">
                      <span>Payment Method</span>
                      <strong>{booking.paymentMethod || "COD"}</strong>
                    </div>

                    <div className="provider-detail-card">
                      <span>Preferred Date</span>
                      <strong>{booking.date || "Not Selected"}</strong>
                    </div>

                    <div className="provider-detail-card">
                      <span>Preferred Time</span>
                      <strong>{booking.time || "Not Selected"}</strong>
                    </div>
                  </div>

                  <div className="provider-progress">
                    <div
                      className={`progress-step ${
                        status === "pending" ||
                        status === "booked" ||
                        status === "accepted" ||
                        status === "completed"
                          ? "active"
                          : ""
                      }`}
                    >
                      <div className="progress-circle">1</div>
                      <span>Booked</span>
                    </div>

                    <div
                      className={`progress-line ${
                        status === "accepted" || status === "completed"
                          ? "active-line"
                          : ""
                      }`}
                    />

                    <div
                      className={`progress-step ${
                        status === "accepted" || status === "completed"
                          ? "active"
                          : ""
                      }`}
                    >
                      <div className="progress-circle">2</div>
                      <span>Accepted</span>
                    </div>

                    <div
                      className={`progress-line ${
                        status === "completed" ? "active-line" : ""
                      }`}
                    />

                    <div
                      className={`progress-step ${
                        status === "completed" ? "active" : ""
                      }`}
                    >
                      <div className="progress-circle">3</div>
                      <span>Completed</span>
                    </div>
                  </div>

                  <div className="provider-booking-actions">
                    <div className="debug-status">
                      Status: {status}
                    </div>

                    {(status === "booked" || status === "pending" || status === "confirmed") && (
                      <>
                        <button
                          className="accept-btn"
                          onClick={() => updateStatus(booking._id, "accepted")}
                        >
                          Accept Booking
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() => updateStatus(booking._id, "rejected")}
                        >
                          Reject Booking
                        </button>
                      </>
                    )}

                    {status === "accepted" && (
                      <button
                        className="complete-btn"
                        onClick={() => updateStatus(booking._id, "completed")}
                      >
                        Complete Service
                      </button>
                    )}

                    {status === "completed" && (
                      <button className="completed-btn">
                        Completed
                      </button>
                    )}

                    {status === "rejected" && (
                      <button className="rejected-btn">
                        Rejected
                      </button>
                    )}
                  <button
                    className="delete-btn"
                    onClick={() => deleteBooking(booking._id)}
                  >
                    Delete
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