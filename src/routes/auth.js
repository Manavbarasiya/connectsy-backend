const express=require("express");
const { validateData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter=express.Router();


authRouter.post("/signup", async (req, res) => {
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
  
  authRouter.post("/login", async (req, res) => {
    try {
       
      const { emailId, password } = req.body;
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("INvalid credentials");
      } else {
        const isPassVal = await user.validatePassword(password);
        //
        if (isPassVal) {
          const token = await user.getJWT();
          // console.log(token);
          res.cookie("token", token);
          res.send(user);
        } else {
          throw new Error("Email/Password is not correct");
        }
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    });
    res.send("Logout succesfull")
  });
  




module.exports=authRouter;