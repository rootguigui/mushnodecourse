const winston = require('winston');

module.exports = function (err, req, res, next) {
    // Log exection to client
    winston.error(err.message, err);
    res.status(500).send('Something failed.')
}