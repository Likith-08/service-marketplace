const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/create", async (req, res) => {
  try {
    const booking = new Booking({
  ...req.body,
  image: req.body.image,   // ✅ ADD THIS
});
    const savedBooking = await booking.save();

const io = req.app.get("io");

io.emit("newBooking", savedBooking);

    res.status(201).json({
      success: true,
      message: "Booking saved successfully",
      booking,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to save booking",
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    const io = req.app.get("io");
   io.emit("bookingUpdated", {
  bookingId: req.params.id,
  status: "deleted",
});

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
      error: error.message,
    });
  }
});
router.put("/:id/status", async (req, res) => {
  try {
    const { bookingStatus } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus },
      { new: true }
    );
const io = req.app.get("io");

io.emit("bookingUpdated", {
  bookingId: req.params.id,
  status: bookingStatus,
});
console.log("🔥 EMITTED bookingUpdated:", {
  status: bookingStatus,
  bookingId: req.params.id,
});

    res.json({
      success: true,
      booking: updatedBooking,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
    });
  }
});
module.exports = router;