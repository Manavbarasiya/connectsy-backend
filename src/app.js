const express = require("express");
const axios = require("axios"); // Make sure axios is installed for HTTP requests
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();
const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // ✅ Allows sending cookies
  })
);

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies from incoming requests

// Routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



// Connect to Database and Start Server
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ message: "Something went wrong!" });
});
