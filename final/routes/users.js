const _ = require('lodash');
const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const { User, validate } = require('../model/user');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let userFound = await User.findOne({ email: req.body.email });
    if (userFound) return res.status(400).send('User already registered.');

    let objUser = _.pick(req.body, ['name', 'email', 'password']);
    const user = new User(objUser);

    const result = await user.save();
    res.send(_.pick(result, [ '_id', 'name', 'email' ]));
});

// router.get('/', async (req, res) => {

// });

// router.get('/', async (req, res) => {

// });

// router.get('/', async (req, res) => {

// });


module.exports = router;