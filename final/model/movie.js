const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { Genre } = require('./genre');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 60,
        required: true
    },
    genreId: {
        type: mongoose.Types.ObjectId,
        ref: Genre,
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        default: 1
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        default: 1
    },
});

const Movie = mongoose.model('Movie', MovieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(60).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(5).integer().max(60).default(1),
        dailyRentalRate: Joi.number().min(0).integer().default(1)
    }

    return Joi.validate(movie, schema);
}


exports.Movie = Movie;
exports.validate = validateMovie;