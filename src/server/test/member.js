const test = require('ava');
const justRegisteredMemberFixtures = require('./fixtures/justRegisteredMember');
const createContext = require('./helper/context');

test('should create a session using his email address', async t => {
  const { User, post } = await createContext(justRegisteredMemberFixtures);
  const user = await User.findOne();
  const res = await post('/api/session', { user: user.toObject() });

  t.is(res.status, 200);
});

test('should reserve a bike using a bike UUID if has valid session', async t => {
  const { Bike, post } = await createContext(justRegisteredMemberFixtures, {
    role: 'member'
  });

  const bike = await Bike.findOne({ reserved: false });
  const res = await post('/api/reservation', { bike: bike.toObject() });

  t.is(res.status, 200);
});

test('should receive a 403 error if trying to reserve a bike without valid session', async t => {
  const { Bike, post } = await createContext(justRegisteredMemberFixtures);
  const bike = await Bike.findOne({ reserved: false });
  const res = await post('/api/reservation', { bike: bike.toObject() });

  t.is(res.status, 403);
});
