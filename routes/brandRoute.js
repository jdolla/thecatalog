const express = require('express');
const uc = require('../controllers/userController');
const br = require('../controllers/brandController');

const brandRouter = express.Router();

brandRouter.get('/', uc.requireAuth, br.getBrands);
brandRouter.post('/save', uc.requireAuth, br.saveBrand);

module.exports = {
    brandRouter,
};