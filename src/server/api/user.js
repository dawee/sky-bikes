const hat = require('hat');

const isEmailAvailable = (User, email) =>
  User.findOne({ email }).then(user => !user);

const registerUserAPI = context => (req, res) => {
  const { User } = context;
  const { email } = req.body;

  return isEmailAvailable(User, email).then(emailAvailable => {
    if (!emailAvailable) {
      return res.status(409).end();
    }

    const user = new User({
      email: req.body.email,
      uuid: hat()
    });

    return user.save().then(() => res.send(user.toObject()).end());
  });
};

module.exports = {
  post: registerUserAPI
};
