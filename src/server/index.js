const hat = require('hat');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const { User } = require('./model/user');
const { Bike, createBike } = require('./model/bike');
const { Station } = require('./model/station');
const memberAPI = require('./api/member');
const reservationAPI = require('./api/reservation');
const sessionAPI = require('./api/session');
const stationAPI = require('./api/station');

const createStation = async name => {
  const station = await new Station({ name, capacity: 10 }).save();

  await createBike({ color: '#9400D3', link: { station, slot: 0 } }),
    await createBike({ color: '#4B0082', link: { station, slot: 1 } }),
    await createBike({ color: '#0000FF', link: { station, slot: 2 } }),
    await createBike({ color: '#00FF00', link: { station, slot: 3 } }),
    await createBike({ color: '#FFFF00', link: { station, slot: 4 } }),
    await createBike({ color: '#FF7F00', link: { station, slot: 5 } }),
    await createBike({ color: '#FF0000', link: { station, slot: 6 } });
};

const createInitialDocuments = async () =>
  Promise.all([
    createStation('Brooklyn'),
    createStation('Manhattan'),
    createStation('Broadway'),
    new User({ uuid: hat(), email: 'admin@skybikes.com', role: 'admin' }).save()
  ]);

const initializeDB = async () => {
  const station = await Station.findOne();

  return !station && createInitialDocuments();
};

const createServer = async (dbURI, middlewares = []) => {
  const db = mongoose.connect(dbURI);
  const server = express();
  const context = {
    db,
    Bike,
    Station,
    User
  };

  await initializeDB(context);

  server.use((req, res, next) => {
    if (
      req.url !== '/' &&
      !req.url.startsWith('/api') &&
      !req.url.match(/^.*\..*$/)
    ) {
      req.url = '/';
    }

    next();
  });

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
