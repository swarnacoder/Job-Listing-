const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
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
  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Attach user data to the request object
  req.user = decodedToken.user;

  next();
};

module.exports = {
  generateToken,
  verifyToken,
  requireAuth,
};
