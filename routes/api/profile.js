const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//Load validatation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

//@route        GET api/profile/test
//@description  Test profile route
//access        Public
router.get('/test', (req, res) => res.json({ msg: 'profile works' }));

//@route        GET api/profile
//@description  Returns the profile of the current User
//access        Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //since this is a protected route, we gona get a
    //token and the user will be in req.user therefore we can get the id as req.user.id
    errors = {}; //empty object which we can add to if we have errors
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar']) //will populate the user inside our profile model
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'Profile not found for this user'; //adding to the errors object
          return res.status(404).json(errors); //returning the errors object if no profile found
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route        GET api/profile/handle/:handle
//@description  Get profile by handle
//access        Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});
//@route        POST api/profile/user/:user_id
//@description  Get profile by user ID
//access        Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

//@route        GET api/profile/all
//@description  GET all profile
//access        Public
router.get('/all', (req, res) => {
  let errors = {};
  //to get all record we use find which will find all and return it back to us in .then()
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profile';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.json({ profile: 'There are no profiles' }));
});

//@route        POST api/profile
//@description  Create/Edit user profile
//access        Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id; //will include avatar name and Email
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //skills--> split into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(','); //will put it in an array splitting it at the commas
    }

    //Social--> object of fields or embedded object
    profileFields.social = {}; //initalise social as empty object
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //UPDATE since there is already a profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        //CREATE
        //check to see if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }
          //save PROFILE
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//@route        GET api/profile/experience
//@description  Add experience to profile
//access        Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //add to experience array in the profiles
      profile.experience.unshift(newExp); //to put it in the begining of the array..push will put it at the end
      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route        GET api/profile/education
//@description  Add education to profile
//access        Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route        DELETE api/profile/experience/:exp_id
//@description  Delete experience from the profile
//access        Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      //find index of the experience to delete
      const indexTodelete = profile.experience.findIndex(item => {
        return item.id === req.params.exp_id;
      });
      //splice out of array.. and we want to splice just 1
      profile.experience.splice(indexTodelete, 1);
      profile.save().then(profile => res.json(profile)); //resave and return the profile
    });
  }
);

//@route        DELETE api/profile/education/:education_id
//@description  Delete experience from the profile
//access        Private
router.delete(
  '/education/:education_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      //find index of the education to DELETE
      const indexTodelete = profile.education.findIndex(item => {
        return item.id === req.params.education_id;
      });

      //delete the education at that indexTodelete
      profile.education.splice(indexTodelete, 1);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route        DELETE api/profile
//@description  Delete user and profile
//access        Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //find one and remove will find a resource and remove it when its found
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
