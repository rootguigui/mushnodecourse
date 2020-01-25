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

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(8).max(14).required(),
        isGold: Joi.boolean().default(false)
    }

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;