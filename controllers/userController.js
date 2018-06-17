// const mongoose = require('mongoose');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const { tknOpt, cookieOpt } = require('../config/config');
const createError = require('http-errors');
const {roles} = require('../helpers/dictionaries');

const createUser = (req, res, next) => {
    const {email, first_name, last_name
        , password, conf_password, user_roles} = req.body;

    if(password !== conf_password){
        return next(createError(400, "Password does not match confirmed password"))
    }

    const newUser = {
        email,
        first_name,
        last_name,
        password,
        user_roles,
    };

    for (const key in newUser){
        if(newUser.hasOwnProperty(key) && !newUser[key]){
            return next(createError(400, `Missing value for ${key}`))
        }
    }

    User.findOne().byEmail(email).exec()
        .then(data => {
            if(data){
                return next(createError(409, 'User already exists'));
            }

            User.create(newUser)
                .then(data => {
                    res.json({id: data._id})
                })
                .catch(err => {
                    return next(createError(500, undefined, err))
                })
        })
        .catch(err => {
            return next(createError(500, undefined, err));
        })
}

const login = (req, res, next) => {
    const { email, password } = req.body

    User.authByEmail(email, password)
        .then( data => {
            if(!data){
                res.clearCookie('thecatalog', cookieOpt)
                return next(createError(401));
            }

            const cookieVal = jwt.sign(
                { id: data.id },
                tknOpt.keys.private,
                {algorithm: 'RS512', expiresIn: tknOpt.expireTime}
            );

            res.cookie('thecatalog', cookieVal, cookieOpt);
            return res.status(200).json();
        })
        .catch( err => {
            return next(createError(500, undefined, err));
        })

}

const logout = (req, res, next) => {
    res.clearCookie('thecatalog', cookieOpt)
    res.status(200).send()
}

const updatePassword = (req, res, next) => {
    const { id:authId, user_roles:authRoles } = req.userInfo
    const { id, password, new_password, new_password_conf } = req.body

    if (authId !== id && !authRoles.includes(roles.admin.name)) {
        return next(createError(401))
    }

    if (!id || !password || !new_password || !new_password_conf){
        return next(createError(400, 'Missing required values.'))
    }

    if(new_password !== new_password_conf){
        return next(createError(400,
            'New password does not match confirmed password'))
    }

    if (authRoles.includes(roles.admin.name) && authId !== id) {
        // if the logged in user is an admin and not modifying own password
        saveNewPassword(id, new_password)
            .then(data => {
                return res.status(200).json();
            })
            .catch(err => {
                return next(createError(500, undefined, err))
            })
    } else {
        User.authById(id, password)
            .then(data => {
                if(!data){
                    return next(createError(401))
                }
                saveNewPassword(id, new_password)
                .then(data => {
                    return res.status(200).json();
                })
                .catch(err => {
                    return next(createError(500, undefined, err))
                })
            })
            .catch(err => {
                return next(createError(500, undefined, err))
            })
    }

}

const saveNewPassword = async (id, newPassword) => {
    const saved = User.findById(id).then(user => {
            user.password = newPassword
            user.save();
            return true;
        })
    return saved;
}

// middleware for adding auth info to req
const getAuth = (req, res, next) => {
    if(req.cookies && req.cookies.thecatalog){
        const token = req.cookies.thecatalog

        try {
            const decode = jwt.verify(token,
                tknOpt.keys.public,
                { algorithms: 'RS512' }
            );

            User.findOne().byId(decode.id)
                .then(data => {
                    req.userInfo = {
                        id: data.id,
                        user_roles: data.user_roles
                    }
                    return next()
                })
                .catch(err => {
                    return next(createError(500, undefined, err))
                })

        } catch (err) {
            if (err.name && err.name === 'TokenExpiredError') {
                res.clearCookie('thecatalog', cookieOpt)
                return next()
            }
            return next(createError(500, undefined, err));
        }
    } else {
        return next()
    }
}

// middleware for enforcing auth
const requireAuth = (req, res, next) => {
    if (!req.userInfo) {
        return next(createError(401))
    }
    return next()
}

module.exports = {
    createUser,
    updatePassword,
    login,
    logout,
    getAuth,
    requireAuth,
}