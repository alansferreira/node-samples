var express = require('express');
var router = express.Router();


/* GET home page. */
router.post('/', function(req, res, next) {
  if (!req.files) return res.status(400).send('No files were uploaded.');
  console.log(req.files);
  res.status(200).send('Files uploaded!');
});

module.exports = router;
