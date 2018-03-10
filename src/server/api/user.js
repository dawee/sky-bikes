const hat = require('hat');

const registerUser = context => (req, res) => {
  const { User } = context;
  const user = new User({
    email: req.body.email,
    uuid: hat()
  });

  return user.save().then(() => res.send(user.toObject()).end());
};

module.exports = {
  post: registerUser
};
