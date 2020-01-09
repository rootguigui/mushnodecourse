const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground', 
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    })
    .then(_ => console.log('Connected to database...'))
    .catch(error => console.error('Could not connect to MongoDB....', error));

const genres = require('./routes/genres');
const customers = require('./routes/customers');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

app.listen(port, () => console.log(`App listening on port ${port}!`));