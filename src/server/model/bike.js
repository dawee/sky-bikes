const createBikeModel = mongoose => {
  const schema = new mongoose.Schema({
    reserved: Boolean
  });

  return mongoose.model('bike', schema);
};

module.exports = createBikeModel;
