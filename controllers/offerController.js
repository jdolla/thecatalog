const Offer = require('../models/offer');
const createError = require('http-errors');
const {roles} = require('../helpers/dictionaries');

const getOffers = (req, res, next) => {
    Offer.find().then(data => {
        return res.json(data);
    }).catch(err => {
        return next(createError(500, undefined, err));
    })
}

const saveOffer = (req, res, next) => {
    const { user_roles:authRoles } = req.userInfo
    const isAdmin = authRoles.includes(roles.admin.name);
    const isManager = authRoles.includes(roles.manager.name);

    if(isAdmin || isManager){
        Offer.create(req.body).then(data => {
            res.json({id: data._id})
        }).catch(err => {
            return next(createError(500, undefined, err))
        })
    } else {
        return next(createError(401));
    }
}

module.exports = {
    getOffers,
    saveOffer,
}