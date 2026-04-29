const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Razorpay = require("razorpay");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const server = http.createServer(app);
require("dotenv").config();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

connectDB();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_ShCx8mjfm8GlNa",
  key_secret: "Wt0TBiK74H7LRADNhqj7IriN",
});

app.set("io", io);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert ₹ to paise
      currency: "INR",
      receipt: "receipt_order_1",
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.log("Razorpay Error:", error);
    res.status(500).json({ message: "Error creating order" });
  }
});

// home route
app.get("/", (req, res) => {
  res.send("Service Marketplace API Running");
});

// protected route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "This is protected data",
    user: req.user,
  });
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});