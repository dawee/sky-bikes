const test = require('ava');
const createContext = require('./helper/context');

test('should register using his email address', t =>
  createContext(async ({ post }) => {
    const res = await post('/api/member', { email: 'john.doe@gmail.com' });

    t.is(res.status, 200);
    t.is(res.body.uuid.length, 32);
  }));

test('should receive a 409 error if trying to register and his email address is already used by another registered user', t =>
  createContext(async ({ post }) => {
    await post('/api/member', { email: 'john.doe@gmail.com' });

    const res = await post('/api/member', { email: 'john.doe@gmail.com' });

    t.is(res.status, 409);
  }));
