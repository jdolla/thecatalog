'use strict';
const mongoose = require('mongoose');
const {roles, productTypes} = require('../helpers/dictionaries');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        validate: t => {
            return productTypes.includes(t);
        }
    }
}, { timestamps: true });

ProductSchema.query.byName = function(name) {
    return this.where({name});
}

module.exports = mongoose.model('Product', ProductSchema);