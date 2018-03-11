const createSession = context => async (req, res) => {
  const { User } = context;
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(403).end();
  }

  user.sessionID = req.sessionID;
  await user.save();

  return res.status(200).end();
};

module.exports = {
  post: createSession
};
