const express = require('express');
const mongoose = require('mongoose');
const app = express();
//DB Config
const db = require('./config/keys').mongoURI;

//CONNECT TO MONGO DB
mongoose
  .connect(db)
  .then(() => console.log('MongoDb Connected'))
  .catch(err => console.log(err));

//IMPORTING ROUTES/api FILES HERE
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

app.get('/', (req, res) => res.send('hello world!'));

//USE routes /api/users will be default paths
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000; //because we are depoying on to heroku or run on port 5000

app.listen(port, () =>
  console.log(`devconnector server  is running on port  ${port} `)
);
