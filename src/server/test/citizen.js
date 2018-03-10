const test = require('ava');
const request = require('supertest');
const { createServer } = require('..');
const { createMongooseMock } = require('./mock/mongoose');

test('A citizen should be able to register using his email address', async t => {
  const mongooseMock = createMongooseMock();
  const server = createServer(mongooseMock);

  return new Promise((resolve, reject) => {
    request(server)
      .post('/api/user')
      .send({ email: 'citizen@gmail.com' })
      .end((err, res) => {
        if (err) return reject(err);

        t.is(res.status, 200);
        t.is(res.body.email, 'citizen@gmail.com');
        t.is(typeof res.body.uuid, 'string');

        resolve();
      });
  });
});
