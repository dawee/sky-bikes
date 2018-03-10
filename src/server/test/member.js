const test = require('ava');
const createServer = require('..');
const createMongooseMock = require('./mock/mongoose');
const justRegisteredMemberFixtures = require('./fixtures/justRegisteredMember');
const { createPostMethod } = require('./helper/request');

test('A member should be able to reserve a bike', async t => {
  const mongooseMock = createMongooseMock(justRegisteredMemberFixtures);
  const server = await createServer(mongooseMock);
  const post = createPostMethod(server);
  const user = await mongooseMock
    .model('user')
    .findOne({ email: 'john.doe@gmail.com' });
  const bike = await mongooseMock.model('bike').findOne({ reserved: false });
  const res = await post('/api/reservation', {
    user: user.toObject(),
    bike: bike.toObject()
  });

  t.is(res.status, 200);
});
