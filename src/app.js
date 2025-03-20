const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const cors=require("cors");
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // ✅ Allows sending cookies
}));
app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/requests")
const userRouter=require("./routes/user");
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Ready to take requests ");
    });
  })
  .catch((err) => {
    console.log("Error");
  });
