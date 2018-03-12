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

test('should rent a bike using a bike UUID if has valid session', t =>
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

test('should receive a 403 error if trying to rent a bike without valid session', t =>
  createContext(async ({ Bike, post }) => {
    const bike = await Bike.findOne()
      .where('link.station')
      .ne(null);
    const res = await post('/api/renting', { uuid: bike.uuid });

    t.is(res.status, 403);
  }, justRegisteredMemberFixtures));

test('should get an null rentingHoursLeft if fetching profile and has never rented a bike', t =>
  createContext(
    async ({ get }) => {
      const res = await get('/api/member/me');

      t.is(res.body.rentingHoursLeft, null);
      t.is(res.status, 200);
    },
    justRegisteredMemberFixtures,
    {
      role: 'member'
    }
  ));

test('should get the saved rentingHoursLeft when fetching profile after starting a rent', t =>
  createContext(
    async ({ Bike, get, post }) => {
      const bike = await Bike.findOne()
        .where('link.station')
        .ne(null);

      const rentingRes = await post('/api/renting', { uuid: bike.uuid });

      t.is(rentingRes.status, 200);

      await new Promise(resolve => setTimeout(() => resolve(), 2000));

      const res = await get('/api/member/me');

      t.is(Math.round(res.body.rentingHoursLeft), 7);
      t.is(res.status, 200);
    },
    justRegisteredMemberFixtures,
    {
      role: 'member'
    }
  ));
