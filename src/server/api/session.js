const createSession = context => (req, res) => {
  const { User } = context;
  const { email } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(403).end();
    }

    const { uuid } = user.toObject();

    req.session.userUUID = uuid;

    return res.status(200).end();
  });
};

module.exports = {
  post: createSession
};
