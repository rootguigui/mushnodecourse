const config = require('config');

module.exports = () => {
    return {
        start: () => {
            require('dotenv').config();

            if (!process.env.jwtPrivateKey) {
                throw new Error('[SERVER]: FATAL ERROR -> Private Key is not defined.');
                process.exit(1);
            }
        }
    }
}