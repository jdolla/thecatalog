const Product = require('../models/product');
const createError = require('http-errors');
const {roles, productTypes} = require('../helpers/dictionaries');

const getProducts = (req, res, next) => {
    Product.find().then(data => {
        return res.json(data);
    }).catch(err => {
        return next(createError(500, undefined, err));
    })
}

const saveProduct = (req, res, next) => {
    const { user_roles:authRoles } = req.userInfo
    const isAdmin = authRoles.includes(roles.admin.name);
    const isManager = authRoles.includes(roles.manager.name);

    if(isAdmin || isManager){
        Product.create(req.body).then(data => {
            res.json({id: data._id})
        }).catch(err => {
            return next(createError(500, undefined, err))
        })
    } else {
        return next(createError(401));
    }
}

const getTypes = (req, res, next) => {
    return res.json(productTypes);
}

module.exports = {
    getProducts,
    saveProduct,
    getTypes
}