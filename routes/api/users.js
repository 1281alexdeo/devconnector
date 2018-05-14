const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
//IMPORT GRAVATAR LIB HERE
const gravatar = require('gravatar');
//IMPORT BCRYPTJS TO HASH THE password
const bcrypt = require('bcryptjs');
//LOAD USER MODEL
const User = require('../../models/User');

//@route        GET api/users/test
//@description  Test users route
//access        Public
router.get('/test', (req, res) => res.json({ msg: 'users works' }));

//@route        post api/users/register
//@description  Register users
//access        Public
router.post('/register', (req, res) => {
  //use mongoose to find if the use exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exist' });
    } else {
      const avatar = gravatar.url(req.body.email, {
        //putting the email into gravatar url to get a gravatar if any
        s: '200', //Size for the gravatar
        r: 'pg', //Rating
        d: 'mm' //Default
      });
      const newUser = new User({
        //creting a new resource
        //data in an object
        name: req.body.name, //will come from react form
        email: req.body.email, //will come from react form
        avatar, //can just put avatar, instead of avatar:avatar since we using ES6
        password: req.body.password
      });
      //GENERATE SALT USING BCRYPTJS
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash; //set the newUser password to the hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
//@route        POST api/users/login
//@description  Login users validation / return jwt token
//access        Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find the user by Email
  User.findOne({ email }).then(user => {
    //{ email } is same as {email:email}  use es6 syntax
    // CHECK FOR USER
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }
    // CHECK PASSWORD.note passowrd in db is hashed there4 use bcryptjs to compare
    bcrypt
      .compare(password, user.password) //return T/F
      .then(isMatch => {
        if (isMatch) {
          //User matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Create JWT Payload
          //Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey, //from keys file
            { expiresIn: 3600 }, //expiration 1hr
            (err, token) => {
              //callback will return err and the token
              res.json({
                success: true,
                token: 'Bearer' + token //tacking Bearer infront of the token
              });
            }
          );
        } else {
          return res.status(400).json({ password: 'Password Incorrect' });
        }
      });
  });
});

module.exports = router;
