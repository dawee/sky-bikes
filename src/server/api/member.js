const hat = require('hat');

const registerMember = context => async (req, res) => {
  const { User } = context;
  const { email } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).end();
  }

  const user = new User({
    email,
    uuid: hat(),
    role: 'member'
  });

  return user.save().then(() => res.send(user.toObject()).end());
};

module.exports = {
  post: registerMember
};
