const express = require('express');
const uc = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', uc.requireAuth, uc.getAllUsers);
userRouter.get('/logout', uc.logout);
userRouter.post('/login', uc.login);
userRouter.post('/create', uc.requireAuth, uc.createUser);
userRouter.post('/pswdUpdt', uc.requireAuth, uc.updatePassword);

// userRouter.post('/pswdRst', resetPassword)

module.exports = {
    userRouter,
};
