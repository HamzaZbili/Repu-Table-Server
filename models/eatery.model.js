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
    photo: String,
    proofOfLivingWage: String,
    hasSignedDeclaration: {
        type: Boolean,
        default: false
    },
    isReputable: {
        type: String,
        enum: ['pending', 'review', 'false', 'repu-table'],
        default: 'false'
    },
    // eatery must be posted by owner
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
    email: String,
    phoneNumber: Schema.Types.String,
    createdAt: {
        type: Date,
        immutable: true
      },
    moderatorNotes: String,
    },
    { timestamps: true },
);

const Eatery = model("Eatery", eaterySchema);

module.exports = Eatery;
