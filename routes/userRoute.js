const express = require('express');
const uc = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', uc.requireAuth, uc.getUsers);
userRouter.get('/logout', uc.logout);
userRouter.post('/login', uc.login);
userRouter.post('/create', uc.requireAuth, uc.createUser);
userRouter.post('/pswdUpdt', uc.requireAuth, uc.updatePassword);
userRouter.get('/roles', uc.requireAuth, uc.getRoles);
userRouter.post('/setrole', uc.requireAuth, uc.setRole);
userRouter.get('/deactivate/:id', uc.requireAuth, uc.deactivate);
userRouter.get('/activate/:id', uc.requireAuth, uc.activate);
// userRouter.post('/pswdRst', resetPassword)

module.exports = {
    userRouter,
};
