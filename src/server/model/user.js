const createUserModel = module.exports = mongoose => {
  const schema = new mongoose.Schema({
    email: 'string',
    uuid: 'string'
  });

  return mongoose.model('User', schema);
};
