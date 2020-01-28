const express = require('express');
const app = express();
const winston = require('winston');
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(cors());
require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/db')();
require('./startup/config');

app.listen(port, () => winston.info(`[SERVER]: App listening on port ${port}!`));