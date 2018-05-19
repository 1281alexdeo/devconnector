const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//load Post model
const Post = require('../../models/Post');

//load valiation
const validatePostInput = require('../../validation/post');

//@route        GET api/posts/test
//@description  Test post route
//access        Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'posts is working'
  })
);

//@route        GET api/post
//@description  Get post
//access        Public
router.get('/', (req, res) => {
  Post.find()
    .then(post => {
      res.json(post);
    })
    .catch(err => res.json(err));
});

//@route        POST api/post
//@description  Create post
//access        Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let { errors, isValid } = validatePostInput(req.body);

    //check isValid returned by the funciton
    if (!isValid) {
      //if any errors send 400 with errors objects
      return res.status(400).json(errors);
    }
    //creating a new Post resource by using the new key word and the Model
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);
module.exports = router;
