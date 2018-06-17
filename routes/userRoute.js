const express = require('express');
const uc = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/login', uc.login);
userRouter.get('/logout', uc.logout);
userRouter.post('/create', uc.requireAuth, uc.createUser);
userRouter.post('/pswdUpdt', uc.requireAuth, uc.updatePassword);
// userRouter.post('/pswdRst', resetPassword)

module.exports = {
    userRouter,
};
