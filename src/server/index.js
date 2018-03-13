const hat = require('hat');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const { User } = require('./model/user');
const { Bike, createBike } = require('./model/bike');
const { Station, createStation } = require('./model/station');
const memberAPI = require('./api/member');
const rentingAPI = require('./api/renting');
const sessionAPI = require('./api/session');
const stationAPI = require('./api/station');

const createStationWithBikes = async name => {
  const station = await createStation({ name, capacity: 10 });

  await createBike({ color: '#9400D3', link: { station, slot: 0 } });
  await createBike({ color: '#4B0082', link: { station, slot: 1 } });
  await createBike({ color: '#0000FF', link: { station, slot: 2 } });
  await createBike({ color: '#00FF00', link: { station, slot: 3 } });
  await createBike({ color: '#FFFF00', link: { station, slot: 4 } });
  await createBike({ color: '#FF7F00', link: { station, slot: 5 } });
  await createBike({ color: '#FF0000', link: { station, slot: 6 } });
};

const createInitialDocuments = async () =>
  Promise.all([
    createStationWithBikes('Brooklyn'),
    createStationWithBikes('Manhattan'),
    createStationWithBikes('Broadway'),
    new User({ uuid: hat(), email: 'admin@skybikes.com', role: 'admin' }).save()
  ]);

const initializeDB = async () => {
  const station = await Station.findOne();

  return !station && createInitialDocuments();
};

const autoReturnBike = async bike => {
  const stations = await Station.find();
  const diffDate = new Date() - bike.renter.lastRentStartDate;

  if (diffDate / 2000 < 8) {
    return;
  }

  for (let station of stations) {
    const bikesInStation = await Bike.find().where('link.station', station);
    let foundFreeSlot = false;

    for (let slot = 0; slot < 10; ++slot) {
      const bikeInSlot = bikesInStation.find(bike => bike.link.slot === slot);

      if (!bikeInSlot) {
        foundFreeSlot = true;
        bike.renter.sessionID = null;
        bike.renter.lastRentStartDate = null;
        bike.renter.banned = true;
        await bike.renter.save();

        bike.renter = null;
        bike.link.station = station;
        bike.link.slot = slot;
        await bike.save();
      }
    }

    if (foundFreeSlot) {
      break;
    }
  }
};

const checkAndBan = async () => {
  const rentedBikes = await Bike.find()
    .populate('renter')
    .where('renter')
    .ne(null);

  for (let bike of rentedBikes) {
    await autoReturnBike(bike);
  }
};

const runCheckTimer = () =>
  setTimeout(() => checkAndBan().then(runCheckTimer), 500);

const createServer = async (dbURI, middlewares = [], enableTimer = false) => {
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
  server.get('/api/member/me', memberAPI.me(context));
  server.post('/api/renting', rentingAPI.post(context));
  server.post('/api/session', sessionAPI.post(context));
  server.get('/api/station/all', stationAPI.all(context));
  server.patch('/api/station/:uuid', stationAPI.patch(context));

  if (enableTimer) {
    runCheckTimer();
  }

  return server;
};

module.exports = createServer;
