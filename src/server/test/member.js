const test = require('ava');
const createServer = require('..');
const createMongooseMock = require('./mock/mongoose');
const justRegisteredMemberFixtures = require('./fixtures/justRegisteredMember');
const { createPostMethod } = require('./helper/request');
const { createKeepSessionMiddleware } = require('./helper/session');

test('should create a session using his email address', async t => {
  const mongooseMock = createMongooseMock(justRegisteredMemberFixtures);
  const User = mongooseMock.model('user');
  const server = await createServer(mongooseMock);
  const post = createPostMethod(server);
  const user = await User.findOne();
  const res = await post('/api/session', { user: user.toObject() });

  t.is(res.status, 200);
});

test('should reserve a bike using a bike UUID if has valid session', async t => {
  const mongooseMock = createMongooseMock(justRegisteredMemberFixtures);
  const keepSession = createKeepSessionMiddleware();
  const User = mongooseMock.model('user');
  const Bike = mongooseMock.model('bike');
  const server = await createServer(mongooseMock, [keepSession]);
  const post = createPostMethod(server);
  const user = await User.findOne();
  const bike = await Bike.findOne({ reserved: false });

  await post('/api/session', { user: user.toObject() });

  const res = await post('/api/reservation', { bike: bike.toObject() });

  t.is(res.status, 200);
});

test('should receive a 403 error if trying to reserve a bike without valid session', async t => {
  const mongooseMock = createMongooseMock(justRegisteredMemberFixtures);
  const keepSession = createKeepSessionMiddleware();
  const Bike = mongooseMock.model('bike');
  const server = await createServer(mongooseMock, [keepSession]);
  const post = createPostMethod(server);
  const bike = await Bike.findOne({ reserved: false });
  const res = await post('/api/reservation', { bike: bike.toObject() });

  t.is(res.status, 403);
});
