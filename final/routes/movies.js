const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../model/movie');

router.get('/', async (req, res) => {
    const movies = await Movie.find().populate('genreId');
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { title, genreId, numberInStock, dailyRentalRate } = req.body;
        const movie = new Movie({
            title, genreId, numberInStock, dailyRentalRate
        });
        const result = await movie.save();
        res.send(result);
    } catch(error) {
        res.status(400).send(error)
    }
});


router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { id } = req.params;
        const { title, genreId, numberInStock, dailyRentalRate } = req.body;
        const movie = await Movie.findByIdAndUpdate(id, {
            $set: {
               title: title, 
               genreId: genreId, 
               numberInStock: numberInStock, 
               dailyRentalRate: dailyRentalRate 
            }
        }, { new: true });
        res.send(movie);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findByIdAndRemove(id);
        res.send(movie);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id).populate('genreId');
        res.send(movie);
    }
    catch(error) {
        res.status(404).send('Id was not found!');
    }
});


module.exports = router;