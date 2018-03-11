const mongoose = require('mongoose');
const createServer = require('../..');
const { createPostMethod, createGetMethod } = require('./request');
const { createKeepSessionMiddleware } = require('./session');

const createContext = async (testHandler, fixtures, userToLog) => {
  const dbURI = 'mongodb://localhost/skybikes-test';

  await mongoose.connect(dbURI);
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();

  const keepSession = createKeepSessionMiddleware();
  const server = await createServer(dbURI, [keepSession]);

  if (fixtures) {
    await Promise.all(
      Object.keys(fixtures).map(modelName => {
        const documents = fixtures[modelName];
        const Model = mongoose.model(modelName);

        return Promise.all(
          documents.map(document => new Model(document).save())
        );
      })
    );
  }

  const post = createPostMethod(server);
  const get = createGetMethod(server);
  const User = mongoose.model('user');
  const Bike = mongoose.model('bike');
  const Station = mongoose.model('station');

  if (userToLog) {
    const user = await User.findOne(userToLog);
    const { email } = user.toObject();

    await post('/api/session', { email });
  }

  return testHandler({ get, post, User, Bike, Station });
};

module.exports = createContext;
