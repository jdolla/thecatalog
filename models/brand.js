'use strict';
const mongoose = require('mongoose');
const {roles} = require('../helpers/dictionaries');

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    site: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

BrandSchema.query.byName = function(name) {
    return this.where({name});
}

module.exports = mongoose.model('Brand', BrandSchema);