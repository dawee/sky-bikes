const range = n => Array.apply(null, { length: n }).map(Function.call, Number);

const listAllStation = context => async (req, res) => {
  const { Bike, Station } = context;
  const stations = await Promise.all(
    (await Station.find()).map(async station => {
      const fed = await Promise.all(
        range(10).map(async slot => ({
          slot,
          bike: await Bike.findOne()
            .where('link.station', station)
            .where('link.slot', slot)
        }))
      );

      return fed.reduce(
        (formated, { slot, bike }) => ({ ...formated, [`slot${slot}`]: bike }),
        { name: station.name, uuid: station.uuid }
      );
    })
  );

  return res
    .status(200)
    .send({ stations })
    .end();
};

const returnBike = context => async (req, res) => {
  const { Bike, User, Station } = context;
  const { bike: { slot, uuid: bikeUUID } } = req.body;
  const { uuid } = req.params;

  const user = await User.findOne({ sessionID: req.sessionID });

  if (!user) {
    return res.status(403).end();
  }

  const station = await Station.findOne({ uuid });

  if (!station) {
    return res.status(404).end();
  }

  const bike = await Bike.findOne({ uuid: bikeUUID });

  if (!bike || bike.link.station !== null) {
    return res.status(409).end();
  }

  const slotBike = await Bike.findOne()
    .where('link.station')
    .equals(station)
    .where('link.slot')
    .equals(slot);

  if (slotBike) {
    return res.status(422).end();
  }

  if (!user._id.equals(bike.renter)) {
    return res.status(403).end();
  }

  bike.link.station = station;
  bike.link.slot = slot;
  bike.renter = null;
  user.lastRentStartDate = null;

  await bike.save();
  await user.save();

  return res.status(200).end();
};

module.exports = {
  all: listAllStation,
  patch: returnBike
};
