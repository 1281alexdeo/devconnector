const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
//DB Config
const db = require('./config/keys').mongoURI; //from keys file in config folder
mongoose //CONNECT TO MONGO DB
  .connect(db)
  .then(() => console.log('MongoDb Connected'))
  .catch(err => console.log(err));
//BODY PARSER MIDDLE WARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//PASSPORT MIDDLEWARE
app.use(passport.initialize());

//PASSPORT CONFIG
require('./config/passport')(passport); //passig passport to passport.js file

//IMPORTING ROUTES routes/api FILES HERE
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//USE ROUTES :/api/users will be default paths
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000; //because we are depoying on to heroku or run on port 5000 ///

app.listen(port, () =>
  console.log(`devconnector server  is running on port  ${port} `)
);
