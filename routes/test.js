const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let query = req.query.q
  res.send('respond with a resource:' + query);
});

module.exports = router;
