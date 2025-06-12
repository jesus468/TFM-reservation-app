
const mongoSanitize = require('express-mongo-sanitize');

const sanitizeRequest = (req, res, next) => {
  req.body && mongoSanitize.sanitize(req.body);
  req.query && mongoSanitize.sanitize(req.query);
  req.params && mongoSanitize.sanitize(req.params);

  next();
};

module.exports = sanitizeRequest;