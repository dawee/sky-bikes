const test = require('ava');
const createServer = require('..');
const createMongooseMock = require('./mock/mongoose');
const justRegisteredMemberFixtures = require('./fixtures/justRegisteredMember');
const { createPostMethod } = require('./helper/request');

test('A citizen should be able to register using his email address', async t => {
  const mongooseMock = createMongooseMock();
  const server = await createServer(mongooseMock);
  const post = createPostMethod(server);
  const res = await post('/api/user', { email: 'john.doe@gmail.com' });

  t.is(res.status, 200);
  t.is(res.body.uuid.length, 32);
});

test('A citizen should not be able to register if his email address is already used by another registered user', async t => {
  const mongooseMock = createMongooseMock(justRegisteredMemberFixtures);
  const server = await createServer(mongooseMock);
  const post = createPostMethod(server);
  const res = await post('/api/user', { email: 'john.doe@gmail.com' });

  t.is(res.status, 409);
});
