const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const config = require('config');
const winston = require('winston');
require('winston-mongodb');

winston.add(winston.transports.File, { filename: 'logfile.log' })
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/vidly'
});

if (!config.get('jwtPrivateKey')) {
    console.log('[SERVER]: FATAL ERROR -> Private Key is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', 
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    })
    .then(_ => console.log('Connected to database...'))
    .catch(error => console.error('Could not connect to MongoDB....', error));

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

app.listen(port, () => console.log(`App listening on port ${port}!`));