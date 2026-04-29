const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup Controller
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    // 🔐 Step 1: generate salt
const salt = await bcrypt.genSalt(10);

// 🔐 Step 2: hash password
const hashedPassword = await bcrypt.hash(password, salt);

// 🔐 Step 3: create user with hashed password
const newUser = new User({
  name,
  email,
  password: hashedPassword
});

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🔑 create token
    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 👉 REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // token
    const token = jwt.sign({ id: user._id }, "secretkey", {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User registered",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// 👉 FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "10m" }
    );

    res.status(200).json({
      message: "Reset token generated",
      resetToken,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signupUser, loginUser,registerUser,forgotPassword };