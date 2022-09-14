const { Schema, model } = require("mongoose");
const validateEmail = require("../utils/validateEmail")

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true 
  },
    password: {
      type: String,
      require: true,
      select: false,
    },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    required: true,
  },
  role: {
      type: Schema.Types.String,
      enum: ["admin", "user"],
      default: "user",
      required: true
    },
  },{ timestamps: true },
);

const User = model("User", userSchema);

module.exports = User;
