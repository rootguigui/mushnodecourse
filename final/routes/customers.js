const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        minlength: 8,
        maxlength: 14,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) => res.send(await Customer.find().sort({ name: 1 })));

router.post('/', async (req, res) => {

    const { error } = validateCustomer(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    try {

        const { name, isGold, phone } = req.body; 

        const customer = new Customer({
            name: name,
            isGold: isGold,
            phone: phone,
        });

        const result = await customer.save();
        res.send(result);

    }
     catch(err) {
         res.status(400).send(error);
     }

});

router.put('/:id', async (req, res) => {

    const { error } = validateCustomer(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const { id } = req.params;

    try {

        const { name, isGold, phone } = req.body; 

        const customer = await Customer.findByIdAndUpdate(id, {
            $set :{
                name: name,
                isGold: isGold ? true : false,
                phone: phone
            }
        }, { new: true });

        res.send(customer);

    }
    catch (err) {
        res.status(404).send(err);
    }
   

});

router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const customer = await Customer.findByIdAndDelete(id);

        res.send(customer);

    } catch (err) {

        res.status(404).send(err);
    }

});

router.get('/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const customer = await Customer.findById(id);
        res.send(customer);

    }
    catch(err) {

        res.status(404).send(err);

    }


});

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(8).max(14).required(),
        isGold: Joi.boolean().default(false)
    }

    return Joi.validate(customer, schema);
}


module.exports = router;