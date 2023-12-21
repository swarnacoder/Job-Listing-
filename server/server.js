require("dotenv").config();
const express = require("express");

const app = express();

const connectDb = require("./utils/db");

app.get("/", (req, res) => {
  res.send("Hello, this is my Node Server!");
});

app.get("/health", (req, res) => {
  res.status(200).send("Server is up and running");
});

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
  });
});
