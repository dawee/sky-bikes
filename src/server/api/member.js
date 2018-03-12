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

  return user.save().then(() =>
    res
      .status(200)
      .send(user.toObject())
      .end()
  );
};

const getLoggedMember = context => async (req, res) => {
  const { User } = context;
  const user = await User.findOne({ sessionID: req.sessionID });

  if (!user) {
    return res.status(403).end();
  }

  return res
    .status(200)
    .send(user.toObject({ virtuals: true }))
    .end();
};

module.exports = {
  me: getLoggedMember,
  post: registerMember
};
