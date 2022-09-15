const { Schema, model } = require("mongoose");

const eaterySchema = new Schema(
  {
    businessName: String,
    address: {
        type: String,
        required: true
    },
    cuisine: [String],
    priceGuide: {
        type: Number,
        min: 0,
        max: 5
    },
    desription: String,
    photo: {
        width: String,
        url: String,
        height: String
    },
    proofOfLivingWage: String,
    declaration: Boolean,
    isReputable: {
        type: String,
        enum: ['pending', 'review', 'false', 'repu-table'],
        default: 'false'
    },
    // eatery must be posted by user
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    manager: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }],
    website: {
        type: String,
        required: true,
      },
        // unsure if will keep in
    email: String,
    phoneNumber: Schema.Types.String,
    },
    { timestamps: true },
);

const Eatery = model("Eatery", eaterySchema);

module.exports = Eatery;
