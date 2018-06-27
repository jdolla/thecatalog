const express = require('express');
const uc = require('../controllers/userController');
const pc = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/', uc.requireAuth, pc.getProducts);
productRouter.post('/save', uc.requireAuth, pc.saveProduct);
productRouter.get('/types', uc.requireAuth, pc.getTypes);

module.exports = {
    productRouter,
};