const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  capacity: Number
});

const Station = mongoose.model('station', schema);

module.exports = { Station };
