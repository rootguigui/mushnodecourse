const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    
    winston.createLogger({
        transports: [
            new winston.transports.Console({ colorize: true, prettyPrint: true }),
            new winston.transports.File({ filename: 'logfile.log', level: 'info' })
        ],
        exceptionHandlers: [
            new winston.transports.File({ filename: 'uncaughtException.log' })
        ]
    });
}