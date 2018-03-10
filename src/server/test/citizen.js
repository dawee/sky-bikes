const test = require('ava');
const createServer = require('..');
const createMongooseMock = require('./mock/mongoose');
const { createPostMethod } = require('./helper/request');

test('A citizen should be able to register using his email address', async t => {
  const mongooseMock = createMongooseMock();
  const server = createServer(mongooseMock);
  const post = createPostMethod(server);
  const res = await post('/api/user', { email: 'citizen@gmail.com' });

  t.is(res.status, 200);
  t.is(res.body.email, 'citizen@gmail.com');
  t.is(typeof res.body.uuid, 'string');
});

test('A citizen should not be able to register if his email address is already used by another registered user', async t => {
  const mongooseMock = createMongooseMock();
  const server = createServer(mongooseMock);
  const post = createPostMethod(server);

  await post('/api/user', { email: 'citizen@gmail.com' });

  const res = await post('/api/user', { email: 'citizen@gmail.com' });

  t.is(res.status, 409);
});
