const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('[SERVER]: FATAL ERROR -> Private Key is not defined.');
        process.exit(1);
    }
}