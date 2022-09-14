const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    eatery: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Eatery",
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    content: {
        type: String,
        required: true,
        maxLength: 400
    }
  }, {timestamps: true}
);

const Review = model("Review", reviewSchema);

module.exports = Review;
