require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const userRoutes = require("./routes/userRoutes")

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("Hello, this is my Node Server!");
});

app.get("/health", (req, res) => {
  res.status(200).send("Server is up and running");
});

// Database Connection and Server Start
connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
  });
});
