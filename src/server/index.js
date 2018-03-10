const express = require('express');
const bodyParser = require('body-parser');
const createUserModel = require('./model/user');
const userAPI = require('./api/user');

const createServer = mongoose => {
  const db = mongoose.connect('mongodb://localhost/skybikes');
  const server = express();
  const context = {
    db,
    User: createUserModel(mongoose)
  };

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.post('/api/user', userAPI.post(context));

  return server;
};

module.exports = { createServer };
