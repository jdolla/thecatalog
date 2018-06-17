const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { tknOpt, hashOpt } = require('../config/config');

const cookieOptions = {
  maxAge: 600000,
};


exports.setAuthCookie = (res, token) => {
  return res.cookie('seahorse', token, cookieOptions);
};

exports.getToken = (userId, firstName) => {
  const payload = {
    id: userId,
    name: firstName,
  };

  const options = {
    algorithm: 'RS512',
    expiresIn: tknOpt.expireTime,
  };

  return jwt.sign(payload, tknOpt.keys.private, options);
};


exports.hashValue = async (clearValue) => {
  return bcrypt.hash(clearValue, hashOpt.saltRounds);
};


exports.requireAuth = (req, res, next) => {
  if (!req.userInfo) {
    return next(createError(401));
  }

  return next();
};

exports.checkAuth = (req, res, next) => {
  const hasCookie = (req.cookies && req.cookies.seahorse);
  const hasAuthHeader = (req.headers && req.headers.authorization);

  if (!hasCookie && !hasAuthHeader) {
    return next();
  }

  let token = '';
  if (hasCookie) {
    token = req.cookies.seahorse;
  } else {
    let authType = '';
    [authType, token] = req.headers.authorization.split(' ');
    if (authType !== 'Bearer') {
      return next();
    }
  }

  try {
    const decode = jwt.verify(token, tknOpt.keys.public, { algorithms: 'RS512' });
    req.userInfo = decode;
  } catch (err) {
    if (err.name && err.name === 'TokenExpiredError') {
      return next();
    }
    return next();
  }

  return next();
};

exports.compareToHash = async (hashValue, clearValue) => {
  return bcrypt.compare(hashValue, clearValue);
};
