const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: String,
  uuid: String,
  role: String
});

const User = mongoose.model('user', schema);

module.exports = { User };
