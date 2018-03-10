const hat = require('hat');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { createUserModel } = require('./model/user');
const { createBikeModel, createBike } = require('./model/bike');
const { createStationModel } = require('./model/station');
const memberAPI = require('./api/member');
const reservationAPI = require('./api/reservation');
const sessionAPI = require('./api/session');
const stationAPI = require('./api/station');

const createStation = async context => {
  const { Bike, Station } = context;

  return new Station({
    slot0: await createBike(Bike, '#9400D3'),
    slot1: await createBike(Bike, '#4B0082'),
    slot2: await createBike(Bike, '#0000FF'),
    slot3: await createBike(Bike, '#00FF00'),
    slot4: await createBike(Bike, '#FFFF00'),
    slot5: await createBike(Bike, '#FF7F00'),
    slot6: await createBike(Bike, '#FF0000')
  }).save();
};

const createInitialDocuments = async context => {
  const { User } = context;

  return Promise.all([
    createStation(context),
    createStation(context),
    createStation(context),
    new User({ uuid: hat(), email: 'admin@skybikes.com', role: 'admin' }).save()
  ]);
};

const initializeDB = async context => {
  const { Station } = context;
  const station = await Station.findOne();

  return !station && createInitialDocuments(context);
};

const createServer = async (mongoose, middlewares = []) => {
  const db = mongoose.connect('mongodb://localhost/skybikes');
  const server = express();
  const context = {
    db,
    Bike: createBikeModel(mongoose),
    Station: createStationModel(mongoose),
    User: createUserModel(mongoose)
  };

  await initializeDB(context);

  server.use(
    session({
      secret: 'Hi Ubi Club dev team',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    })
  );

  middlewares.forEach(middleware => server.use(middleware));

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.post('/api/member', memberAPI.post(context));
  server.post('/api/reservation', reservationAPI.post(context));
  server.post('/api/session', sessionAPI.post(context));
  server.get('/api/station/all', stationAPI.all(context));

  return server;
};

module.exports = createServer;
