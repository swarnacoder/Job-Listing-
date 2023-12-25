// userController.js
const User = require("../models/userModel");
const { generateToken } = require("../utils/auth");
const bcrypt = require("bcryptjs")
// LOGIC FOR REGISTRATION
const registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check for required fields
    if (!name || !email || !mobile || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all necessary fields" });
    }

    // Check if the user already exists based on email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ name, email, mobile, password: hashpassword });
    await newUser.save();

    // Generate a JWT token for the registered user
    const token = generateToken(newUser._id, newUser.name);

    // Send success response with token
    return res
      .status(201)
      .json({ message: "User registered successfully", token, recruiterName: newUser.name });
  } catch (error) {
    next(error);
  }
};

// LOGIC FOR LOGIN

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for email and password in the request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Check if the user exists in the database based on the provided email and password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password with stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token for the authenticated user
    const token = generateToken(user._id, user.name);

    // Send the token as a response upon successful login
    return res.status(200).json({ message: "Login successful", token, recruiterName: user.name });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
