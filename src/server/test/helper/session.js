const createKeepSessionMiddleware = () => {
  let session = null;

  return (req, res, next) => {
    req.session = session = session || req.session;
    return next();
  };
};

module.exports = { createKeepSessionMiddleware };
