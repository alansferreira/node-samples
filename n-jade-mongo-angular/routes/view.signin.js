var express = require('express');
var apiRouter = express.Router();

/* GET users listing. */
apiRouter.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Express' });
});

module.exports = apiRouter;