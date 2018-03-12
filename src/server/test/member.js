const test = require('ava');
const justRegisteredMemberFixtures = require('./fixtures/justRegisteredMember');
const createContext = require('./helper/context');

test('should create a session using his email address', t =>
  createContext(async ({ User, post }) => {
    const user = await User.findOne();
    const { email } = user.toObject();
    const res = await post('/api/session', { email });

    t.is(res.status, 200);
  }, justRegisteredMemberFixtures));

test('should reserve a bike using a bike UUID if has valid session', t =>
  createContext(
    async ({ Bike, post }) => {
      const bike = await Bike.findOne()
        .where('link.station')
        .ne(null);
      const res = await post('/api/renting', { uuid: bike.uuid });

      t.is(res.status, 200);
    },
    justRegisteredMemberFixtures,
    {
      role: 'member'
    }
  ));

test('should receive a 403 error if trying to reserve a bike without valid session', t =>
  createContext(async ({ Bike, post }) => {
    const bike = await Bike.findOne()
      .where('link.station')
      .ne(null);
    const res = await post('/api/renting', { bike: bike.toObject() });

    t.is(res.status, 403);
  }, justRegisteredMemberFixtures));
