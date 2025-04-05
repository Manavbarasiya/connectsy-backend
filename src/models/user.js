const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email address not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    photoURL: {
      type: String,
      default: "", // You still have an empty string as the default value
    },
    about: {
      type: String,
      default: "Hello this is default",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to check and set the default photoURL if it's empty
userSchema.pre("save", function (next) {
  if (!this.photoURL && this.firstName && this.lastName) {
    this.photoURL = `https://robohash.org/${this.firstName}-${this.lastName}.png`;
  }
  next();
});

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@!@#$", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordByInput) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(passwordByInput, user.password);
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
