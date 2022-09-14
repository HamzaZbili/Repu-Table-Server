require("dotenv/config")
require("../db/index")

const Eatery = require("../models/eatery.model")
const User = require("../models/User.model")
const getRandomId = require("../utils/getRandomId")

const eaterySeeds = [
    {name: "little kitchen",
    address: "123 North Street",
    cuisine: "Colombian",
    cuisine2: "Vegan",
    website: "www.littlekitchen.com",
    priceGuide: 4,
    isReputable: true},
    {name: "big kitchen",
    address: "62 South Street",
    cuisine: "Sushi",
    cuisine2: "Japanese",
    website: "www.bigkitchen.com",
    priceGuide: 4,
    isReputable: false},
    {name: "Come fly",
    address: "123 Take Off",
    website: "www.wings.com",
    cuisine: "Wings",
    cuisine2: "Cajun",
    priceGuide: 2,
    isReputable: false},
    {name: "Tom Kerridge",
    address: "London Probably",
    website: "www.tripplecookedchips.com",
    cuisine: "British",
    priceGuide: 5,
    isReputable: false},
    {name: "Mammas House",
    address: "123 North Street",
    website: "www.mammamia.com",
    cuisine: "Italian",
    cuisine2: "Calzones",
    cuisine3: "Pizza",
    priceGuide: 3,
    isReputable: false}
];


(async function () {
    const allUsers = await User.find()
    eaterySeeds.forEach((eatery) => {
        eatery.owner = getRandomId(allUsers)
    })
    const eateryWithUser = await Eatery.create(eaterySeeds)
    console.log(eateryWithUser)
    process.exit()
})()