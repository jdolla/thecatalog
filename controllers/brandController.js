const Brand = require('../models/brand.js');
const createError = require('http-errors');
const {roles} = require('../helpers/dictionaries');

const getBrands = (req, res, next) => {
    Brand.find().then(data => {
        return res.json(data);
    }).catch(err => {
        return next(createError(500, undefined, err));
    })
}

const saveBrand = (req, res, next) => {
    const { user_roles:authRoles } = req.userInfo
    const isAdmin = authRoles.includes(roles.admin.name);
    const isManager = authRoles.includes(roles.manager.name);

    if(isAdmin || isManager){
        Brand.create(req.body).then(data => {
            res.json({id: data._id})
        }).catch(err => {
            return next(createError(500, undefined, err))
        })
    } else {
        return next(createError(401));
    }
}


module.exports = {
    getBrands,
    saveBrand
}