const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const generateToken = (userId, recruiterName) => {
  const token = jwt.sign({ userId, recruiterName }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error); 
    return null;
  }
};


const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization; 
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decodedToken = verifyToken(token);
  console.log(decodedToken)
  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Attach user data to the request object
  req.user = decodedToken.user;
  req.user.recruiterName = decodedToken.recruiterName; // Add recruiterName

  next();
};

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next();
};

module.exports = {
  generateToken,
  verifyToken,
  requireAuth,
  validateObjectId
};
