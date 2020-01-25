const express = require('express');
const app = express();
const winston = require('winston');

const port = process.env.PORT || 3000;

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config');

app.listen(port, () => winston.info(`[SERVER]: App listening on port ${port}!`));