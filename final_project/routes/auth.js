const config = require('config');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../model/user');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let userFound = await User.findOne({ email: req.body.email });
    if (!userFound) return res.status(400).send('Invalid email or password!');

    const validPassword = await bcrypt.compare(req.body.password, userFound.password);
    if (!validPassword) return res.status(400).send('Invalid email or password!');

    const token = userFound.generateAuthToken();
    res.send({ name: userFound.name, email: userFound.email, token });
});

function validate(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(50).required(),
    }

    return Joi.validate(user, schema);
}

module.exports = router;