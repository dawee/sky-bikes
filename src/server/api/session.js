const createSession = context => async (req, res) => {
  const { User } = context;
  const { user: reqUser } = req.body;

  const user = await User.findOne({ uuid: reqUser.uuid });

  if (!user) {
    return res.status(403).end();
  }

  const { uuid } = user.toObject();

  req.session.userUUID = uuid;

  return res.status(200).end();
};

module.exports = {
  post: createSession
};
