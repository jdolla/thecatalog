const express = require('express');
const uc = require('../controllers/userController');
const oc = require('../controllers/offerController');

const offerRouter = express.Router();

offerRouter.get('/', uc.requireAuth, oc.getOffers);
offerRouter.post('/save', uc.requireAuth, oc.saveOffer);

module.exports = {
    offerRouter,
};