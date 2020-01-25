const mongoose = require('mongoose')
const winston = require('winston');

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly', 
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    })
    .then(_ => winston.info('Connected to database...'))
}