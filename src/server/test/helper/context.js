const createMongooseMock = require('../mock/mongoose');
const createServer = require('../..');
const { createPostMethod, createGetMethod } = require('./request');
const { createKeepSessionMiddleware } = require('./session');

const createContext = async (fixtures, userToLog) => {
  const keepSession = createKeepSessionMiddleware();
  const mongooseMock = createMongooseMock(fixtures);
  const server = await createServer(mongooseMock, [keepSession]);
  const post = createPostMethod(server);
  const get = createGetMethod(server);
  const User = mongooseMock.model('user');
  const Bike = mongooseMock.model('bike');
  const Station = mongooseMock.model('station');

  if (userToLog) {
    const user = await User.findOne(userToLog);
    const { email } = user.toObject();

    await post('/api/session', { email });
  }

  return { get, post, User, Bike, Station };
};

module.exports = createContext;
