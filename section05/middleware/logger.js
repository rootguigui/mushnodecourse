function logger(req, res, next) {
    console.log('logging...');
    next();
}

function auth(req, res, next) {
    console.log('authenticating...');
    next();
}

module.exports = { logger, auth };