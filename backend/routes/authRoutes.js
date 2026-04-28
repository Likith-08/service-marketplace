const express = require("express");
const router = express.Router();

const { signupUser, loginUser,registerUser} = require("../controllers/authController");

// Signup Route
router.post("/signup", signupUser);

// Login Route
router.post("/login", loginUser);

// 👉 REGISTER
router.post("/register", registerUser);

module.exports = router;