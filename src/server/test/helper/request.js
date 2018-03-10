const supertest = require('supertest');

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

module.exports = { createPostMethod };
