const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
      enum: ["INR", "USD", "EUR"],
      default: "INR",
    },

    category: {
      type: String,
      required: true,
    },

    providerName: {
      type: String,
      default: "",
    },

    providerPhoto: {
      type: String,
      default: "",
    },

    providerExperience: {
      type: String,
      default: "",
    },

    providerRating: {
      type: Number,
      default: 4.8,
    },

    providerPhone: {
      type: String,
      default: "",
    },

    providerLocation: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);