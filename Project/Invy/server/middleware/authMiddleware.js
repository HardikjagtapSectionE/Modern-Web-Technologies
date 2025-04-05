// authMiddleware.js

const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("x-auth-token"); // Get token from the request header

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authenticateUser;
