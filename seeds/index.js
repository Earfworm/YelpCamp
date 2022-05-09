const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62756a2a3a47c807b68732a1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum dicta temporibus tempore, pariatur in ea cum optio, praesentium possimus perspiciatis quibusdam molestiae obcaecati consequatur quia doloribus quidem quod magnam mollitia!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dhonhu2dq/image/upload/v1651973860/YelpCamp/w4gbtn1fdytv7dg7vpt1.png',
                    filename: 'YelpCamp/w4gbtn1fdytv7dg7vpt1'

                },
                {
                    url: 'https://res.cloudinary.com/dhonhu2dq/image/upload/v1651973861/YelpCamp/qvcxdujvfvvyjw8cmjji.png',
                    filename: 'YelpCamp/qvcxdujvfvvyjw8cmjji'

                }
            ]

        })
        await camp.save()
    }
}


seedDB().then(() => {
    mongoose.connection.close();
});