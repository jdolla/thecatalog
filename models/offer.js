'use strict';
const mongoose = require('mongoose');
const {roles, productTypes} = require('../helpers/dictionaries');

const OfferSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    brand: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: true,
    },
    subscription: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });

OfferSchema.query.byName = function(name) {
    return this.where({name});
}

module.exports = mongoose.model('Offer', OfferSchema);