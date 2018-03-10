const formatBike = bike => {
  if (!bike) {
    return null;
  }

  const { color, reserved } = bike.toObject();

  return { color, reserved };
};

const listAllStation = context => async (req, res) => {
  const { Station } = context;

  const stations = await Station.find();

  return res
    .status(200)
    .send({
      stations: stations.map(station => {
        const {
          slot0,
          slot1,
          slot2,
          slot3,
          slot4,
          slot5,
          slot6,
          slot7,
          slot8,
          slot9
        } = station.toObject();

        return {
          slot0: formatBike(slot0),
          slot1: formatBike(slot1),
          slot2: formatBike(slot2),
          slot3: formatBike(slot3),
          slot4: formatBike(slot4),
          slot5: formatBike(slot5),
          slot6: formatBike(slot6),
          slot7: formatBike(slot7),
          slot8: formatBike(slot8),
          slot9: formatBike(slot9)
        };
      })
    })
    .end();
};

module.exports = {
  all: listAllStation
};
