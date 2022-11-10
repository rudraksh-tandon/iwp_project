const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

// async is asynchronus function
const connectDB = async () => {
  try {
    // below is a promise
    // await is we'll wait for this statement to get executed, no matter how much time anf then only proceed
    const conn = await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("MongoDB Connected");
    });
  } catch (err) {
    console.log(`Error in connecting to DB: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
