const express = require("express");
const router = express.Router();

const { signupUser, loginUser,registerUser,forgotPassword} = require("../controllers/authController");

// Signup Route
router.post("/signup", signupUser);

// Login Route
router.post("/login", loginUser);

// 👉 REGISTER
router.post("/register", registerUser);

router.post("/forgot-password", forgotPassword);

module.exports = router;