const hat = require('hat');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  uuid: String,
  color: String,
  link: {
    station: { type: mongoose.Schema.Types.ObjectId, ref: 'station' },
    slot: Number
  },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});

const Bike = mongoose.model('bike', schema);

const createBike = data =>
  new Bike({
    ...data,
    uuid: hat()
  }).save();

module.exports = { createBike, Bike };
