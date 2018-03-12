const hat = require('hat');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  capacity: Number,
  uuid: String
});

const Station = mongoose.model('station', schema);

const createStation = data =>
  new Station({
    ...data,
    uuid: hat()
  }).save();

module.exports = { createStation, Station };
