const { Customer, validate } = require('../model/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => res.send(await Customer.find().sort({ name: 1 })));

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
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
    const { error } = validate(req.body);
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

module.exports = router;