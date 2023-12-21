require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
// console.log(process.env.MONGODB_URI);

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection successful to DB");
      } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(0);
  }
};

module.exports = connectDb;





