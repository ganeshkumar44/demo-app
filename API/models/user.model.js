const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Enter your first name"],
    },
    lastname: {
      type: String,
      required: [true, "Enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Enter your email address"],
      match: [/.+\@.+\..+/, "Please enter a valid email address"], // optional email validation
    },
    contact: {
      type: Number,
      required: [true, "Enter your contact number"],
      validate: {
        validator: function (v) {
          return v.toString().length >= 10;
        },
        message: "Contact number should be at least 10 digits",
      },
    },
    dateofbirth: {
      type: Date,
      required: [true, "Enter your date of birth"],
      set: function (value) {
        const parsedDate = moment(value, "DD/MM/YY", true);
        if (!parsedDate.isValid()) {
          throw new Error("Date of birth must be in the format dd/mm/yy");
        }
        return parsedDate.toDate();
      },
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
      validate: {
        validator: function (v) {
          return (
            v.length >= 8 &&
            /[A-Z]/.test(v) &&      // At least one uppercase letter
            /[a-z]/.test(v) &&      // At least one lowercase letter
            /[!@#$%^&*(),.?":{}|<>]/.test(v) // At least one special character
          );
        },
        message:
          "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one special character",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
