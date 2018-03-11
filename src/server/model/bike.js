const hat = require('hat');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  uuid: String,
  reserved: Boolean,
  color: String
});

const Bike = mongoose.model('bike', schema);

const createBike = (Bike, color) =>
  new Bike({
    color,
    reserved: false,
    uuid: hat()
  }).save();

module.exports = { createBike, Bike };
