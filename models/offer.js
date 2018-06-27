'use strict';
const mongoose = require('mongoose');
const {roles, productTypes} = require('../helpers/dictionaries');
const { ProductSchema } = require('./product');

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
    products: ProductSchema,
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
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

OfferSchema.query.byName = function(name) {
    return this.where({name});
}

module.exports = mongoose.model('Offer', OfferSchema);