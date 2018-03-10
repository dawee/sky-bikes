const hat = require('hat');

const registerUser = context => async (req, res) => {
  const { User } = context;
  const { email } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).end();
  }

  const user = new User({
    email: req.body.email,
    uuid: hat()
  });

  return user.save().then(() => res.send(user.toObject()).end());
};

module.exports = {
  post: registerUser
};
