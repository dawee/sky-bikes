const createUserModel = mongoose => {
  const schema = new mongoose.Schema({
    email: 'string',
    uuid: 'string'
  });

  return mongoose.model('User', schema);
};

module.exports = createUserModel;
