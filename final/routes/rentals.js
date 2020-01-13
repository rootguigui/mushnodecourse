const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const router = express.Router();
const { Rental, validate }  = require('../model/rental');
const { Customer } = require('../model/customer');
const { Movie } = require('../model/movie');
const Fawn = require('fawn');
const mongoose = require('mongoose');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().select('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { movieId, customerId } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).send('Movie was not found!');

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).send('Customer was not found!');

    if (movie.numberInStock === 0) return res.status(400).send('movie not in stock');

    const { name, isGold, phone } = customer;
    const { title, dailyRentalRate } = movie;

    let rental = new Rental({
        customer: {
            _id: customer.customerId,
            name: name,
            phone, phone
        },
        movie: {
            _id: movieId,
            dailyRentalRate: dailyRentalRate,
            title: title
        }
    });

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run()
        
        res.send(rental);
    } catch(error) {
        res.status(500).send('something failed...')
    }
});


// router.put('/:id', async (req, res) => {

// });

// router.delete('/:id', async (req, res) => {

// });

// router.get('/:id', async (req, res) => {

// });

module.exports = router;