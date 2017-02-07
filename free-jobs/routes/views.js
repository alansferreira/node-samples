var appConfig = require('../config/app.config');

module.exports = function(app){
  var express = require('express');
  var apiRouter = express.Router();

  /* bypass page names to jade views */
  app.use(appConfig.appContextRootName, 
    apiRouter.get('/page/:viewName', function(req, res, next) {
      res.render(req.params.viewName, { title: 'Express' });
    })
  );

  app.use(appConfig.appContextRootName, 
    apiRouter.get('/entrar', function(req, res, next) {
      res.render('signin', { title: 'Express' });
    })
  );

  app.use(appConfig.appContextRootName, 
    apiRouter.get('/', function(req, res, next) {
      res.render('home', { title: 'Express' });
    })
  );
};
