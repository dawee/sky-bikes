const listAllStation = context => (req, res) => {
  const { Station } = context;

  Station.find()
    .populate([
      'slot0',
      'slot1',
      'slot2',
      'slot3',
      'slot4',
      'slot5',
      'slot6',
      'slot7',
      'slot8',
      'slot9'
    ])
    .exec()
    .then(stations =>
      res
        .status(200)
        .send({
          stations: stations.map(station => station.toObject())
        })
        .end()
    );
};

module.exports = {
  all: listAllStation
};
