const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://weeknd244:5qcCFh85HEtKl4GI@namastenode.5yqhm.mongodb.net/devTinder");
    console.log("✅ MongoDB Connected Successfully...");
  } catch (err) {
    console.error("❌ Database Connection Error:", err.message);
    process.exit(1); 
  }
};
module.exports = connectDB;
