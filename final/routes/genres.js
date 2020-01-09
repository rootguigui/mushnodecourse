const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find()
            .sort({ name: 1 });

        res.send(genres);

    } catch (ex) {
        res.status(400).send(ex);
    }
});

router.post('/', async (req, res) => {

    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    try {

        const genre  = new Genre({
            name: req.body.name
        });

        const result = await genre.save();
        res.send(result);

    } catch (ex) {
        const errorResult = [];
        for(field in ex.errors) {
            const { properties } = ex.errors[field]
            errorResult.push(properties.message);
        }

        res.status(400).send(errorResult)
    }


});

router.put('/:id', async (req, res) => {

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { id } = req.params;
        const genre = await Genre.findByIdAndUpdate(id, {
            $set: {
               name: req.body.name 
            }
        }, { new: true });
        
        res.send(genre);

    } catch (ex) {
        res.status(404).send(ex);
    }
});

router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const genre = await Genre.findByIdAndRemove(id);
    
        res.send(genre);

    } catch (ex) {

        res.status(404).send(ex);

    }
});

router.get('/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const genre = await Genre.find({ _id: id });

        res.status(200).send(genre);

    } catch (ex) {

        res.status(404).send(`This genre with propertie Id equal to ${ex.value} wasn't found`);

    }

});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

module.exports = router;