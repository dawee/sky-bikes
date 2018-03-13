const createSession = context => async (req, res) => {
  const { User } = context;
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(403)
      .send({ error: 'No user found with this email' })
      .end();
  }

  if (user.banned) {
    return res
      .status(403)
      .send({ error: 'You have been banned from the system' })
      .end();
  }

  user.sessionID = req.sessionID;
  await user.save();

  return res.status(200).end();
};

module.exports = {
  post: createSession
};
