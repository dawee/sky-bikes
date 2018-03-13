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

const deleteSession = context => async (req, res) => {
  const { User } = context;
  const user = await User.findOne({ sessionID: req.sessionID });

  if (!user || user.uuid !== req.params.uuid) {
    return res.status(403).end();
  }

  req.sessionID = null;
  user.sessionID = null;
  await user.save();

  return res.status(200).end();
};

module.exports = {
  del: deleteSession,
  post: createSession
};
