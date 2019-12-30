const debug = require('debug')('app:startup'); // debug the application without console.log
// const dbDebugger = require('debug')('app:db');
const config = require('config');
const express = require("express");
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');
require('dotenv').config();
const { logger, auth } = require('./middleware/logger');

/**
 * Debbug command in terminal to set de environment variables
 * export DEBUG=app:startup to apply debug geral debug
 * export DEBUG=app:db to apply debug database
 * export DEBUG=app:* to set all debug console
 */


// environment
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`)

// port
const port = process.env.PORT || 5000;

app.set("view engine", "pug");
app.set("views", "./views"); // default

// middleware
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
app.use(logger);
app.use(auth);

// Configuration
// console.log("Application name: " + config.get('name'));
// configuração para colocar o password em uma variavel do sistema 
// console.log("Mail Server: " + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled ...'); // substituindo console.log()
}

// dbDebugger("Connecting to database ...");

app.listen(port, (err) => {
    if (err) throw console.error(err);
    
    console.log(`Listening on port ${port} ...`);
});