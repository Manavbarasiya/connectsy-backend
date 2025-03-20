const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const app = express();
const { validateData } = require("./utils/validation");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  //Validation

  try {
    validateData(req);
    const { password, firstName, lastName, emailId } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    // console.log(hashedPass);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPass,
    });
    await user.save();
    res.send("Data saved successfully in DB");
  } catch (err) {
    res.status(400).send("Error savinf the user: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("INvalid credentials");
    } else {
      const isPassVal = await bcrypt.compare(password, user.password);
      //
      if (isPassVal) {
        const token = await jwt.sign({ _id: user._id }, "DEV@!@#$", {
          expiresIn: "7d",
        });
        console.log(token);
        res.cookie("token", token);
        res.send("Login successfull");
      } else {
        throw new Error("Email/Password is not correct");
      }
    }
  } catch (err) {
    res.status(400).send("Error saving the user: " + err);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const name = req.user.firstName;
  res.send(`${name} is sending the connection request`);
});

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Ready to take requests ");
    });
  })
  .catch((err) => {
    console.log("Error");
  });
