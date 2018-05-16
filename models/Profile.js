const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATING THE PROFILE Schema
const ProfileSchema = new Schema({
  //connecting User model to this model
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users' //reference to the collection that we want to relate to
  },
  handle: {
    //for SEO friendly profile which we can just seacch and directly access a profile eg on github
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    //type select when in the form--> the role of the User
    type: String,
    required: true
  },
  skills: {
    type: [String], //its going to be an array CSV in the form
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  //array of object properties such as experience,educations
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: String,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  //embeded objects
  social: {
    youtube: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
