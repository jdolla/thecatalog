'use strict';
const mongoose = require('mongoose');
const {roles} = require('../helpers/dictionaries');

const RoleSchema = new mongoose.Schema({
  name: {
      type: String,
      require: true,
      validate: {
          validator: val => {
              return roles.includes(val);
          },
          message: "{VALUE} is not a valid user role."
      }
  }
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: {
      type: String,
      required: true
  },
  last_login_date: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    default: 'active',
    validate: {
      validator: val => {
        return ['active', 'inactive'].includes(val);
      }
    }
  },
  user_roles: [RoleSchema]
});

module.exports = mongoose.model('User', UserSchema);