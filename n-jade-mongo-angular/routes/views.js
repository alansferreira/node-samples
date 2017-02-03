
module.exports = function(app){
  var express = require('express');
  var apiRouter = express.Router();

  /* bypass page names to jade views */
  app.use('/myapp/', 
    apiRouter.get('/page/:viewName', function(req, res, next) {
      res.render(req.params.viewName, { title: 'Express' });
    })
  );

};
