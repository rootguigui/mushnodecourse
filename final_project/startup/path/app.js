const winston = require('winston');
const app = require('express')();

module.exports = ({ logging, database, routes, config }) => {

    const port = process.env.PORT || 3000;

    return {
        start: () => {
            Promise.resolve({
                then:  () => { 
                    config.start();
                    logging.start();
                    database.init();
                    routes.start(app);
                    app.listen(port, () => winston.info(`[SERVER]: App listening on port ${port}!`));
                }
            })
        }
    }
}


