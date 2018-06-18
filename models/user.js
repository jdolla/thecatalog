'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { tknOpt, hashOpt } = require('../config/config');
const {roles} = require('../helpers/dictionaries');

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
  user_roles: {
    type: Array,
    required: true,
    validate: arr => {
      if(arr.length === 0){
        return false;
      }
      return arr.every(elem => roles.hasOwnProperty(elem))
    }
  }
}, { timestamps: true });


UserSchema.query.byEmail = function(email) {
  return this.where({email});
}

UserSchema.query.byId = function(id) {
  return this.where({_id: id});
}

UserSchema.pre('save', async function(){
  const user = this
  const { saltRounds } = hashOpt
  const hash = await bcrypt.hash(user.password, saltRounds);
  user.password = hash;
})

UserSchema.statics.authById = async function(id, password){
  const user = await this.findOne().byId(id);
  const match = await bcrypt.compare(password, user.password);

  return (match && user.status === 'active')
    ? { id: user.id, roles: user.user_roles } : null;
}

UserSchema.statics.authByEmail = async function(email, password){
  const user = await this.findOne().byEmail(email);
  const match = await bcrypt.compare(password, user.password);
  return (match) ? { id: user.id, roles: user.user_roles } : null;
}



module.exports = mongoose.model('User', UserSchema);