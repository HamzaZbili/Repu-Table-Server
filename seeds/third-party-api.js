const axios = require("axios");
require("dotenv/config");
require("../db/index");
const Eatery = require("../models/eatery.model");
const User = require("../models/user.model");

const getRandomId = require("../utils/getRandomId")

const travelAdvisorURL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
const APIKey = "601e707f9emsh1df3d0671e69073p18dcc8jsn7dfb57201b89";
const host = "travel-advisor.p.rapidapi.com";

// gets restaurant data from wyre-data with location argument
const findRestaurants = async () => {
  const config = {
    method: "GET",
    url: travelAdvisorURL,
    params: {
      bl_latitude: "51.511704",
      tr_latitude: "51.513927",
      bl_longitude: "-0.134615",
      tr_longitude: "-0.127319",
    },
    headers: {
      "X-RapidAPI-Key": APIKey,
      "X-RapidAPI-Host": host,
    },
  };
  try {
    const response = await axios.request(config);
    response.data.data.forEach(async (eatery) => {
      const { name, address, website, phone, cuisine, description, email, photo} = eatery;
      if (
        !cuisine ||
        !cuisine.length ||
        !name ||
        !address ||
        !website ||
        !phone ||
        !photo.images.medium ||
        !description
      ) {
        return;
      }
      const newEatery = {
        businessName: name,
        address: address,
        cuisine: cuisine.map(({key, ...cuisine}) => {
          return cuisine.name;
        }),
        description: description,
        photo: photo.images.medium.url,
        email: email,
        website: website,
        phoneNumber: phone,
      };
      const allUsers = await User.find()
      newEatery.owner = await getRandomId(allUsers)
      const seededEateries = await Eatery.create(newEatery);
      console.log(seededEateries)
    });
  } catch (error) {
    console.error(error);
  }
};

findRestaurants()

module.exports = { findRestaurants };
