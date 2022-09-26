const router = require("express").Router();
const Eatery = require("../../models/eatery.model");
const Review = require("../../models/review.model");
const isAuth = require("../../middleware/isAuth");

router.get("/", async (req, res, next) => {
  try {
    const eateries = await Eatery.find({ isReputable: "repu-table" }).sort({
      createdAt: -1,
    });
    res.status(200).json(eateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const eateries = await Eatery.find({
      isReputable: "repu-table",
      _id: req.params.id,
    });
    res.status(200).json(eateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/reviews/:id", isAuth, async (req, res, next) => {
  try {
    const author = req.user.id;
    const eatery = req.params.id;
    const { rating, content } = req.body;
    const currentTime = new Date();
    const recentlyReviewed = await Review.findOne({
      author: author,
      eatery: eatery,
      created_at: -1,
    }).sort({ createdAt: -1 });
    if (recentlyReviewed) {
      console.log(recentlyReviewed);
      const timeSinceLastReviewedInMinutes =
        (currentTime - recentlyReviewed.createdAt) / (1000 * 60);
      if (timeSinceLastReviewedInMinutes < 1) {
        res.status(403).json({
          message:
            "You have recently posted a review for this eatery, you must wait before you can post another one",
        });
        return;
      }
    }
    const newReview = await Review.create({
      author: req.user.id,
      eatery: eatery,
      rating: rating,
      content: content,
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/reviews/:id", async (req, res, next) => {
  try {
    const findReviews = await Review.find({ eatery: req.params.id })
      .populate("author")
      .sort({ createdAt: -1 });
    res.status(200).json(findReviews);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/reviews/update/:id/:average", async (req, res, next) => {
  try {
    const updateRating = await Eatery.findOneAndUpdate(
      { eatery: req.params.id },
      { rating: req.params.average },
      { new: true }
    );
    res.status(200).json(updateRating);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/reviews/my/:id", isAuth, async (req, res, next) => {
  try {
    const myReviews = await Review.find({ author: req.user.id }).populate(
      "author eatery"
    );
    res.status(200).json(myReviews);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
