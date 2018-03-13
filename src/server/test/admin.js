const test = require('ava');
const createContext = require('./helper/context');
const justRegisteredMemberFixtures = require('./fixtures/justRegisteredMember');

test('should see all users with their personal infos and banned status', t =>
  createContext(
    async ({ get }) => {
      const res = await get('/api/member/all');

      t.is(res.status, 200);
      t.is(res.body.members.length, 1);
      t.is(res.body.members[0].email, 'john.doe@gmail.com');
      t.is(res.body.members[0].banned, false);
      t.is(res.body.members[0].uuid, 'e472ac3cf5403f28f04cb497c769900f');
      t.is(res.body.members[0].role, 'member');
      t.is(res.body.members[0].firstName, 'John');
      t.is(res.body.members[0].lastName, 'Doe');
      t.is(res.body.members[0].emergencyPhoneNumber, '0836656565');
      t.is(res.body.members[0].rentingHoursLeft, null);
    },
    justRegisteredMemberFixtures,
    {
      role: 'admin'
    }
  ));
