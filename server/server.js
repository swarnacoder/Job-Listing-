const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, this is my Node Server!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
