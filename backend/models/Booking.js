const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },

    customerName: String,
    phone: String,
    address: String,
    city: String,
    date: String,
    time: String,
    notes: String,

    serviceTitle: String,
    providerName: String,
    price: Number,
    currency: String,

    paymentMethod: String,

    paymentStatus: {
      type: String,
      default: "paid",
    },

    bookingStatus: {
      type: String,
      default: "confirmed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);