const { Schema, model } = require("mongoose");
const validateEmail = require("../utils/validateEmail");

const eaterySchema = new Schema(
  {
    businessName: String,
    address: {
      type: String,
      required: true,
    },
    cuisine: [String],
    rating: Number,
    description: String,
    photo: String,
    proofOfLivingWage: String,
    isReputable: {
      type: String,
      enum: ["pending", "review", "false", "repu-table"],
      default: "false",
    },
    // eatery must be posted by owner
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    manager: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    website: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phoneNumber: Schema.Types.String,
    createdAt: {
      type: Date,
      immutable: true,
    },
    noteToUs: String,
    moderatorNotes: String,
  },
  { timestamps: true }
);

const Eatery = model("Eatery", eaterySchema);

module.exports = Eatery;
