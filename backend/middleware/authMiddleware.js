const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check header exists
    if (!authHeader) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // Check correct format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token format wrong" });
    }

    // Extract token safely
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Verify token
    const verified = jwt.verify(token, "secretkey");

    req.user = verified;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;