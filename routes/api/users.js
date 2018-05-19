const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//IMPORT GRAVATAR LIB HERE
const gravatar = require('gravatar');
//IMPORT BCRYPTJS TO HASH THE password
const bcrypt = require('bcryptjs');

//LOAD USER MODEL
const User = require('../../models/User');

//@route        post api/users/register
//@description  Register users
//access        Public
router.post('/register', (req, res) => {
  //pullout errors and isValid keys property from the function validateRegisterInput
  const { errors, isValid } = validateRegisterInput(req.body); //pass everything sent to this route from form
  //check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //use mongoose to find if the use exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exist';
      return res.status(400).json(errors);
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
  const { errors, isValid } = validateLoginInput(req.body);
  // //check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const email = req.body.email;
  const password = req.body.password;

  //Find the user by Email
  User.findOne({ email }).then(user => {
    //{ email } is same as {email:email}  use es6 syntax
    // CHECK FOR USER
    if (!user) {
      errors.email = 'User  email not found';
      return res.status(404).json(errors);
    }
    // CHECK PASSWORD.note passowrd in db is hashed there4 use bcryptjs to compare
    bcrypt
      .compare(password, user.password) //return T/F
      .then(isMatch => {
        if (isMatch) {
          //User matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Create JWT Payload can be any data u want
          //Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey, //from keys file
            { expiresIn: 3600 }, //expiration 1hr
            (err, token) => {
              //callback will return err and the token
              res.json({
                success: true,
                token: 'Bearer ' + token //tacking Bearer and spae infront of the token
              });
            }
          );
        } else {
          return res.status(400).json({ password: 'Password Incorrect' });
        }
      });
  });
});
//CREATE A PRIVATE ROUTE TO TEST PASSPORT
//@route        GE T api/users/current
//@description  Return the current user
//access        Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //the user details is now in req.user
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
