const makeReservation = context => async (req, res) => {
  const { User, Bike } = context;
  const { uuid } = req.body;
  const user = await User.findOne({ sessionID: req.sessionID });

  if (!user) {
    return res.status(403).end();
  }

  const reservedBike = await Bike.findOne().where('renter', user);

  if (reservedBike) {
    return res.status(409).end();
  }

  const bike = await Bike.findOne({ uuid });

  if (!bike || user._id.equals(bike.renter)) {
    return res.status(422).end();
  }

  bike.link.station = null;
  bike.renter = user;
  await bike.save();

  return res.status(200).end();
};

module.exports = {
  post: makeReservation
};
