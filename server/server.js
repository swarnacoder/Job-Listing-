require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const userRoutes = require("./routes/userRoutes")
const jobRoutes = require("./routes/jobRoutes")
const errorMiddleware = require("./middlewares/errorMiddleware")
const app = express();


// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);



// Health Check Route
app.get("/", (req, res) => {
  res.send("Hello, this is my Node Server!");
});

app.get("/health", (req, res) => {
  res.status(200).send("Server is up and running");
});

app.all('*', (req, res, next) => {
    const error = new Error(`Something went wrong! Please try after some time.`);
    error.status = 404; 
    next(error); 
  });
app.get("/invalid-endpoint", (req, res, next) => {
    const error = new Error("This is an intentional error");
    next(error);
  });
  

// Database Connection and Server Start
connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
  });
});

// Error Handler Middleware
app.use(errorMiddleware); 