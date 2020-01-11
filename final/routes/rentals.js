const express = require('express');
const router = express.Router();
const { Rental, validate }  = require('../model/rental');
const { Customer } = require('../model/customer');
const { Movie } = require('../model/movie');

router.get('/', async (req, res) => {
    const rentals = await Rental.find().select('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const error = validate(req.body);
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
    const result = await rental.save();
    movie.numberInStock--;
    movie.save();
    
    res.send(result);
});


router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

router.get('/:id', async (req, res) => {

});

module.exports = router;