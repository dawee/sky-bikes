const makeReservation = context => async (req, res) => {
  const { User, Bike } = context;
  const { bike: reqBike } = req.body;
  const { userUUID } = req.session;

  if (!userUUID) {
    return res.status(403).end();
  }

  const user = await User.findOne({ uuid: userUUID });

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
  post: makeReservation
};
