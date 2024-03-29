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

test('should remove a session', t =>
  createContext(
    async ({ User, del }) => {
      const user = await User.findOne({ role: 'member' });
      const { uuid } = user.toObject();
      const res = await del(`/api/session/${uuid}`);

      t.is(res.status, 200);
    },
    justRegisteredMemberFixtures,
    {
      role: 'member'
    }
  ));

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

test('should return bike when giving an available slot', t =>
  createContext(
    async ({ Bike, Station, patch, post }) => {
      const bike = await Bike.findOne()
        .where('link.station')
        .ne(null);

      const rentingRes = await post('/api/renting', { uuid: bike.uuid });

      t.is(rentingRes.status, 200);

      const station = await Station.findOne();

      const res = await patch(`/api/station/${station.uuid}`, {
        bike: { slot: 9, uuid: bike.uuid }
      });

      t.is(res.status, 200);
    },
    justRegisteredMemberFixtures,
    {
      role: 'member'
    }
  ));

test('should see all stations with their initial bycicles when no one made a renting', t =>
  createContext(
    async ({ get }) => {
      const res = await get('/api/station/all');

      t.is(res.status, 200);
      t.is(res.body.stations[0].slot0.color, '#9400D3');
      t.is(res.body.stations[0].slot1.color, '#4B0082');
      t.is(res.body.stations[0].slot2.color, '#0000FF');
      t.is(res.body.stations[0].slot3.color, '#00FF00');
      t.is(res.body.stations[0].slot4.color, '#FFFF00');
      t.is(res.body.stations[0].slot5.color, '#FF7F00');
      t.is(res.body.stations[0].slot6.color, '#FF0000');
    },
    justRegisteredMemberFixtures,
    {
      role: 'member'
    }
  ));
