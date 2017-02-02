var express = require('express');
var apiRouter = express.Router();

/* GET users listing. */
apiRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = apiRouter;