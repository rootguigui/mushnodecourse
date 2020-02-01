const { asFunction, createContainer } = require('awilix');

const app = require('./path/app');
const database = require('./path/db');
const config = require('./path/config');
const logging = require('./path/logging');
const routes = require('./path/routes');

const container = createContainer();

container.register({
    app: asFunction(app).singleton(),
    database: asFunction(database).singleton(),
    config: asFunction(config).singleton(),
    logging: asFunction(logging).singleton(),
    routes: asFunction(routes).singleton(),
});


module.exports = container;