const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//set it to a variable called User then = mongoose.model('name we wana use','name of the schema')
module.exports = User = mongoose.model('users', UserSchema);
