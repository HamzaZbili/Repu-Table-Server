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
      // Soho
      bl_latitude: "51.511704",
      tr_latitude: "51.513927",
      bl_longitude: "-0.134615",
      tr_longitude: "-0.127319",
      //Westminster
      // bl_latitude: "51.501475",
      // tr_latitude: "51.507967",
      // bl_longitude: "-0.140820",
      // tr_longitude: "-0.122839"
    },
    headers: {
      "X-RapidAPI-Key": APIKey,
      "X-RapidAPI-Host": host,
    },
  };
  try {
    const response = await axios.request(config);
    response.data.data.forEach(async (eatery) => {
      const { name, address, website, phone, cuisine, description, email, photo, rating} = eatery;
      if (
        !cuisine ||
        !cuisine.length ||
        !name ||
        !address ||
        !website ||
        !phone ||
        !photo.images.medium ||
        !description ||
        !rating
      ) {
        return;
      }
      console.log(response.data.data[0])
      const newEatery = {
        businessName: name,
        address: address,
        cuisine: cuisine.map(({key, ...cuisine}) => {
          return cuisine.name;
        }),
        rating: rating,
        description: description,
        photo: photo.images.medium.url,
        email: email,
        website: website,
        phoneNumber: phone,
      };
      const eateryAccounts = await User.find({role: 'eateryAccount'})
      // console.log(eateryAccounts)
      newEatery.owner = await getRandomId(eateryAccounts)
      const seededEateries = await Eatery.create(newEatery);
      console.log(seededEateries)
    });
  } catch (error) {
    console.error(error);
  }
};

findRestaurants()

module.exports = { findRestaurants };
