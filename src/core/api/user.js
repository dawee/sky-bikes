const getUser = context => (req, res) => {
  return res.send({}).end();
};

module.exports = {
  get: getUser
};
