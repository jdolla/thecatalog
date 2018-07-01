'use strict';
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

ProductSchema.query.byName = function(name) {
    return this.where({name});
}

module.exports = mongoose.model('Product', ProductSchema)