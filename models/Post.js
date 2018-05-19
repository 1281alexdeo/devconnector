const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE Schema
const PostSchema = new Schema({});

//set it to a variable called User then = mongoose.model('name we wana use','name of the schema')
module.exports = Post = mongoose.model('post', PostSchema);
