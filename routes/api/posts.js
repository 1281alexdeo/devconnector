const express = require('express');
const router = express.Router();

//@route        GET api/posts/test
//@description  Test post route
//access        Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'posts is working'
  })
);

module.exports = router;
