const { Schema, model } = require("mongoose");

const applicationModel = new Schema(
  {
    applicant: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    eatery: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Eatery",
    },
    declarationSigned: {
        type: Boolean,
        default: false
    },
    livingWageEmployer: {
        title: String,
        description: String,
        imageUrl: String
    },
  }, {timestamps: true}
);

const Review = model("Review", reviewSchema);

module.exports = Review;