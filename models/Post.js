const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE Schema
const PostSchema = new Schema({
  //connect each post to a USER
  user: {
    type: Schema.Types.ObjecId,
    ref: 'users' //refering to the users collection
  },
  text: {
    type: String,
    required: true
  },
  //each post should have name and avatar
  // so that we can preserve posts even after the account has been deleted
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    //should store arrays of user ids
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  //commets will be array of objects
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  //date for the post
  date: {
    type: Date,
    default: Date.now
  }
});

//set it to a variable called User then = mongoose.model('name we wana use','name of the schema')
module.exports = Post = mongoose.model('post', PostSchema);
