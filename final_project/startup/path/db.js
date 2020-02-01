const mongoose = require('mongoose')
const winston = require('winston');

module.exports = () => {
    return {
        init: () => {
            mongoose.connect('mongodb://localhost/vidly', 
            { 
                useUnifiedTopology: true, 
                useNewUrlParser: true 
            })
            .then(_ => winston.info('Connected to database...'))
        }
    }
}