const hat = require('hat');

const registerMember = context => async (req, res) => {
  const { User } = context;
  const { email, emergencyPhoneNumber, firstName, lastName } = req.body;

  if (!email || !emergencyPhoneNumber || !firstName || !lastName) {
    return res.status(422).end();
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).end();
  }

  const user = new User({
    email,
    emergencyPhoneNumber,
    firstName,
    lastName,
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
  const { Bike, User } = context;
  const user = await User.findOne({ sessionID: req.sessionID });
  const bike = await Bike.findOne().where('renter', user);

  if (!user) {
    return res.status(403).end();
  }

  return res
    .status(200)
    .send({
      ...user.toObject({ virtuals: true }),
      bike: bike ? bike.toObject() : null
    })
    .end();
};

const getAllMembers = context => async (req, res) => {
  const { User, Bike } = context;
  const user = await User.findOne({ sessionID: req.sessionID });

  if (!user || user.role !== 'admin') {
    return res.status(403).end();
  }

  const members = await User.find({ role: 'member' });
  const bikes = await Bike.find()
    .where('renter')
    .ne(null);

  const formatedMembers = members.map(member => {
    const bike = bikes.find(bike => member._id.equals(bike.renter));

    return {
      ...member.toObject({ virtuals: true }),
      bike: bike ? bike.toObject() : null
    };
  });

  return res
    .status(200)
    .send({ members: formatedMembers })
    .end();
};

module.exports = {
  all: getAllMembers,
  me: getLoggedMember,
  post: registerMember
};
