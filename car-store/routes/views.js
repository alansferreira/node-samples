
module.exports = function(app){
  var config = require('../config/app.config');
  var express = require('express');
  var apiRouter = express.Router();

  /* bypass page names to jade views */
  app.use('/', 
    apiRouter.get('/page/:viewName', function(req, res, next) {
      res.render(req.params.viewName, { title: config.displayName, version: config.version });
    })
  );

  app.use('/', 
    apiRouter.get('/signin', function(req, res, next) {
      res.render('signin', { title: 'Express' });
    })
  );

  app.use('/', 
    apiRouter.get('/', function(req, res, next) {
      res.render('home', { title: 'Express' });
    })
  );
};
