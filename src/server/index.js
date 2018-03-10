const express = require('express');
const bodyParser = require('body-parser');
const createUserModel = require('./model/user');
const createBikeModel = require('./model/bike');
const userAPI = require('./api/user');
const reservationAPI = require('./api/reservation');

const createInitialDocuments = context => {
  const { Bike } = context;

  return new Bike({ reserved: false }).save();
};

const initializeDB = async context => {
  const { Bike } = context;
  const bike = await Bike.findOne();

  return !bike && createInitialDocuments(context);
};

const createServer = async mongoose => {
  const db = mongoose.connect('mongodb://localhost/skybikes');
  const server = express();
  const context = {
    db,
    Bike: createBikeModel(mongoose),
    User: createUserModel(mongoose)
  };

  await initializeDB(context);

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.post('/api/user', userAPI.post(context));
  server.post('/api/reservation', reservationAPI.post(context));

  return server;
};

module.exports = createServer;
