// const mongoose = require('mongoose');
const User = require('../models/user.js');
const createError = require('http-errors');

const findByEmail = (req, res, err) => {
    const email = 'none@none.com';
    User.findOne({'email': email}, (err, data) => {
        if(err){
            console.log(err);
            next(createError(400, 'Password is required'));
        }
        return res.json(data);
    });

}


module.exports = {
    findByEmail
}