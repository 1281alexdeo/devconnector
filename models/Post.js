const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE Schema
const PostSchema = new Schema({
  //connect each post to a USER
  user: {
    type: Schema.Types.ObjecId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  }
});

//set it to a variable called User then = mongoose.model('name we wana use','name of the schema')
module.exports = Post = mongoose.model('post', PostSchema);
