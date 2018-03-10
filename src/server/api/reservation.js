const makeAReservation = context => async (req, res) => {
  const { User, Bike } = context;
  const { user: reqUser, bike: reqBike } = req.body;

  const user = await User.findOne({ uuid: reqUser.uuid });

  if (!user) {
    return res.status(403).end();
  }

  const bike = await Bike.findOne({ uuid: reqBike.uuid });

  if (!bike) {
    return res.status(422).end();
  }

  return res.status(200).end();
};

module.exports = {
  post: makeAReservation
};
