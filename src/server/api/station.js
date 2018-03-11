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
        {}
      );
    })
  );

  return res
    .status(200)
    .send({ stations })
    .end();
};

module.exports = {
  all: listAllStation
};
