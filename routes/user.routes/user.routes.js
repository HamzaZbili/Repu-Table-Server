const router = require("express").Router();
const Eatery = require('../../models/eatery.model');
const Review = require("../../models/review.model");
const isAuth = require("../../middleware/isAuth");

router.get("/", async (req, res, next) => {
    try {
        const eateries = await Eatery.find({isReputable: 'repu-table'})
        res.status(200).json(eateries);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const eateries = await Eatery.find(
            {isReputable: 'repu-table',
             _id: req.params.id})
        res.status(200).json(eateries);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post("/:id", isAuth, async (req, res, next) => {
    try {
        const author = req.user.id;
        const eatery = req.params.id;
        const {rating, content} = req.body;
        const currentTime = new Date();
        const recentlyReviewed = await Review.findOne({
            author: author,
            eatery: eatery},
            ).sort({createdAt: -1})
        console.log(recentlyReviewed)
        const timeSinceLastReviewedInMinutes = (recentlyReviewed.createdAt - currentTime) / (1000 * 60);
        if (timeSinceLastReviewedInMinutes < 1) {
            res.status(403).send("You have recently posted a review for this eatery");
            return
        }
        const newReview = await Review.create({
            author: req.user.id,
            eatery: eatery,
            rating: rating,
            content: content
        })
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/reviews/:id", async (req, res, next) => {
    try {
        const findReviews = await Review.find(
            {eatery: req.params.id})
            
        res.status(200).json(findReviews);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;