import React, { useEffect, useState } from "react";
import socket from "../utils/socket";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);

 useEffect(() => {
  socket.on("newBooking", (data) => {
    setNotifications((prev) => [data, ...prev]);
  });

 socket.on("bookingUpdated", (data) => {
  setNotifications((prev) =>
    prev.filter((item) => item._id !== data.bookingId)
  );
});

  return () => {
    socket.off("newBooking");
    socket.off("bookingUpdated");
  };
}, []);

  return (
    <div style={{
  position: "fixed",
  top: "78px",   // 🔥 move below header
  right: "20px",
  zIndex: 99999, // 🔥 increase priority
  fontSize: "26px"
}}>
      🔔

      {notifications.length > 0 && (
        <span style={{
          position: "absolute",
          top: "-8px",
          right: "-10px",
          background: "red",
          color: "white",
          borderRadius: "50%",
          padding: "3px 6px",
          fontSize: "12px",
          fontWeight: "bold"
        }}>
          {notifications.length}
        </span>
      )}
    </div>
  );
}