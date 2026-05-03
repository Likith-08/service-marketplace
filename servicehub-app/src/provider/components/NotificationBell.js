import React, { useEffect, useState } from "react";
import socket from "../utils/socket";
import BASE_URL from "../../config";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // 🔥 wake server
    fetch(BASE_URL).catch(() => {});

    // ❌ REMOVED socket.connect() (important fix)

    // ✅ INITIAL LOAD (ONLY CONFIRMED BOOKINGS)
    fetch(`${BASE_URL}/api/bookings`)
      .then((res) => res.json())
      .then((data) => {
        const confirmedBookings = data.filter(
          (b) => b.bookingStatus === "confirmed"
        );
        setNotifications(confirmedBookings);
      })
      .catch(() => {});

    // ✅ NEW BOOKING → ADD (NO DUPLICATES)
    socket.on("newBooking", (data) => {
      if (data.bookingStatus === "confirmed") {
        setNotifications((prev) => {
          const exists = prev.some(
            (item) => String(item._id) === String(data._id)
          );
          if (exists) return prev;
          return [data, ...prev];
        });
      }
    });

    // ✅ BOOKING UPDATED → REMOVE DIRECTLY
   socket.on("bookingUpdated", () => {
  // 🔥 RE-FETCH LATEST BOOKINGS
  fetch(`${BASE_URL}/api/bookings`)
    .then((res) => res.json())
    .then((data) => {
      const confirmedBookings = data.filter(
        (b) => b.bookingStatus === "confirmed"
      );
      setNotifications(confirmedBookings);
    })
    .catch(() => {});
});

    return () => {
      socket.off("newBooking");
      socket.off("bookingUpdated");
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "78px",
        right: "20px",
        zIndex: 99999,
        fontSize: "26px",
      }}
    >
      🔔

      {notifications.length > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-10px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "3px 6px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {notifications.length}
        </span>
      )}
    </div>
  );
}