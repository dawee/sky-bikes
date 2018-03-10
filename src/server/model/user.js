const createUserModel = mongoose => {
  const schema = new mongoose.Schema({
    email: String,
    uuid: String,
    role: String
  });

  return mongoose.model('user', schema);
};

module.exports = { createUserModel };
