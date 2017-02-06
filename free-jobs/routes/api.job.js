module.exports = function(app, passport) {

  var express = require('express');
  var apiRouter = express.Router();
  var Job = require('../models/model.job');


  /* GET users listing. */
  apiRouter
    .get('/api/job/:limit/:sortBy?', function(req, res, next) {
      var limit = req.params.limit;
      var sortBy = req.params.sortBy;
      
      Job.find(function(err, jobs) {
        if (err) res.send(err);

        res.json(jobs);
      });
    })

    .post('/api/job', function(req, res, next) {
      var limit = req.params.limit;
      var sortBy = req.params.sortBy;
      
      var newJob = new Job(req.body);

      // save the user
      newJob.save(function(err) {
          if (err)
              throw err;
          return done(null, newJob);
      });
    })
  ;

  return apiRouter
};

var loginStatus = function(req, res){
  if(req.isAuthenticated()){
    res.json({status: 'ok', user: req.user._doc.local.email});
  }else{
    res.json({status: 'not-logged'});
  }
}
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}