const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE Schema
const UserSchema = new Schema({
  name: {
    type: string,
    require: true
  },

  email: {
    type: string,
    require: true
  },
  password: {
    type: string,
    require: true
  },
  avatar: {
    type: string,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//set it to a variable called User then = mongoose.model('name we wana use','name of the schema')
module.exports = User = mongoose.model('users', 'UserSchema');
