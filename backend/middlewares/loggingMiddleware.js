const log = require('../../logging-middleware/log');

module.exports = (level, pkg, message) => async (req, res, next) => {
  await log("backend", level, pkg, message);
  next();
};
