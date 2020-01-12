const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')

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

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

app.listen(port, () => console.log(`App listening on port ${port}!`));