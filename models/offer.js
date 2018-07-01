'use strict';
const mongoose = require('mongoose');

const SubProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

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
    product: SubProductSchema,
    brand: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
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