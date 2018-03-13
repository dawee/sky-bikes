const supertest = require('supertest');

const createDeleteMethod = server => uriPath =>
  new Promise((resolve, reject) =>
    supertest(server)
      .del(uriPath)
      .end((err, res) => {
        if (err) return reject(err);

        return resolve(res);
      })
  );

const createPostMethod = server => (uriPath, body) =>
  new Promise((resolve, reject) =>
    supertest(server)
      .post(uriPath)
      .send(body)
      .end((err, res) => {
        if (err) return reject(err);

        return resolve(res);
      })
  );

const createPatchMethod = server => (uriPath, body) =>
  new Promise((resolve, reject) =>
    supertest(server)
      .patch(uriPath)
      .send(body)
      .end((err, res) => {
        if (err) return reject(err);

        return resolve(res);
      })
  );

const createGetMethod = server => uriPath =>
  new Promise((resolve, reject) =>
    supertest(server)
      .get(uriPath)
      .end((err, res) => {
        if (err) return reject(err);

        return resolve(res);
      })
  );

module.exports = {
  createDeleteMethod,
  createPatchMethod,
  createPostMethod,
  createGetMethod
};
