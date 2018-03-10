const hat = require('hat');

const createBikeModel = mongoose => {
  const schema = new mongoose.Schema({
    reserved: Boolean,
    color: String
  });

  return mongoose.model('bike', schema);
};

const createBike = (Bike, color) =>
  new Bike({
    color,
    reserved: false,
    uuid: hat()
  }).save();

module.exports = { createBike, createBikeModel };
