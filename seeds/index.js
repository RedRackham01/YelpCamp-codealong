const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch(() => {
    console.log("ERROR");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "6634f68ecb25ca2c3b5cd740",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi doloremque corrupti dolor repellat",
      price: Math.floor(Math.random() * 20 + 10),
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dfpu4pgat/image/upload/v1714807863/YelpCamp/zh7fuoycdzx6w99sbrkr.jpg",
          filename: "YelpCamp/zh7fuoycdzx6w99sbrkr",
        },
        {
          url: "https://res.cloudinary.com/dfpu4pgat/image/upload/v1714807865/YelpCamp/f4yf1xxxa45ahjp6do27.jpg",
          filename: "YelpCamp/f4yf1xxxa45ahjp6do27",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Mongo Connection Closed");
});
