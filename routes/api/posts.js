const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//load  Model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

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
//@description  Get All post and sort by date
//access        Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 }) //sort the post by date
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(404).json({ nopostfound: 'No posts found' }));
});

//@route        GET api/post/post_id
//@description  Get post by ID
//access        Public
router.get('/:post_id', (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
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

//@route        DELETE api/post/:post_id
//@description  Delete post
//access        Private
router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id).then(post => {
        //check for post the owner
        //to make sure only owner is allowed to delete the posts
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'User not Authorized' });
        }
        //delete
        post
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({ postnotfound: 'Post not found' })
          );
      });
    });
  }
);

//@route        POST api/post/like/:post_id
//@description   Like post
//access        Private
router.post(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id).then(post => {
        //check if users in the likes array matches the id of the current user. filter will return a new array if it found a match.
        //if the fillterd array length is > 0 that means there exist a user with that id in the array.hence he/she already liked the post
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res.status(400).json({ error: 'You already liked this post' });
        }
        //Add the user's id into the likes array-->hence liking the posts
        post.likes.unshift({ user: req.user.id });
        //save to database
        post
          .save()
          .then(post => res.json(post))
          .catch(err => res.json(err));
      });
    });
  }
);

//@route        POST api/post/unlike/:post_id
//@description   Like post
//access        Private
router.post(
  '/unlike/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id).then(post => {
        //check if users in the likes array matches the id of the current user. filter will return a new array if it found a match.
        //if the fillterd array length is > 0 that means there exist a user with that id in the array.hence he/she already liked the post
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          //user already liked the posts
          //remove the current users id from the likes array
          //1. findthe index of the user id to DELETE
          const indexTodelete = post.likes.findIndex(like => {
            return like.user.toString() === req.user.id; //like.user is not a string
          });
          post.likes.splice(indexTodelete, 1);

          //save
          post
            .save()
            .then(post => res.json(post))
            .catch(err => res.json(err));

          res.json({ success: true, post });
        }
        return res
          .status(400)
          .json({ notliked: 'You have not yet liked the post' });
      });
    });
  }
);

//@route        POST api/post/comment/:post_id
//@description   Add comment to a  post
//access        Private
router.post(
  '/comments/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let { errors, isValid } = validatePostInput(req.body);
    //check validaiton
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.post_id).then(post => {
      //constuct the new comment object
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };
      //add the newComment to the comments array
      post.comments.unshift(newComment);
      //save to database
      post.save().then(post => res.json(post));
    });
  }
);

//@route        DELETE api/post/comment/:post_id
//@description  Deleting a comment from a post
//access        Private
router.delete(
  '/comments/:post_id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let { errors, isValid } = validatePostInput(req.body);
    //check validaiton
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.post_id).then(post => {
      //check if the comment exsists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        //=== 0 meanst comment does not exsists
        return res.status(404).json({ nocomment: 'Comment not exist ' });
      }
      //determine the index of the comment to delete
      const indexTodelete = post.comments.findIndex(comment => {
        return comment._id.toString() === req.params.comment_id;
      });
      //delete the comment by splicing out the comment at the indexTodelete from the comments array
      post.comments.splice(indexTodelete, 1);
      //save to database
      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.json(err));
    });
  }
);
module.exports = router;
