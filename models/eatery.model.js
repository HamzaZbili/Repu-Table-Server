const { Schema, model } = require("mongoose");
const validateEmail = require("../utils/validateEmail")
const listOfCuisines = require("./model data/listOfCuisines")

const eaterySchema = new Schema(
  {
    name: String,
    address: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        enum: listOfCuisines,
        required: true
    },
    cuisine2: {
        type: String,
        enum: listOfCuisines
    },
    cuisine3: {
        type: String,
        enum: listOfCuisines
    },
    priceGuide: {
        type: Number,
        min: 0,
        max: 5
    },
    isReputable: {
        type: Boolean,
        default: false
    },
    // eatery must be posted by user
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    website: {
        type: String,
        required: true,
      },
        // unsure if will keep in
        // email: {
        //     type: String,
        //     trim: true,
        //     lowercase: true,
        // unique: true,
        // required: true,
        // validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    //   },
    areaCode: Schema.Types.Number,
    phoneNumber: Schema.Types.Number,
    },
    { timestamps: true },
);

const Eatery = model("Eatery", eaterySchema);

module.exports = Eatery;
