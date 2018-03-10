const createStationModel = mongoose => {
  const BikeType = { type: mongoose.Schema.Types.ObjectId, ref: 'bike' };

  const schema = new mongoose.Schema({
    slot0: BikeType,
    slot1: BikeType,
    slot2: BikeType,
    slot3: BikeType,
    slot4: BikeType,
    slot5: BikeType,
    slot6: BikeType,
    slot7: BikeType,
    slot8: BikeType,
    slot9: BikeType
  });

  return mongoose.model('station', schema);
};

module.exports = { createStationModel };
