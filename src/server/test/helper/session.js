const createKeepSessionMiddleware = () => {
  let sessionID = null;

  return (req, res, next) => {
    req.sessionID = sessionID = sessionID || req.sessionID;
    return next();
  };
};

module.exports = { createKeepSessionMiddleware };
