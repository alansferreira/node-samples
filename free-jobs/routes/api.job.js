
module.exports = function(app, passport) {

  var express = require('express');
  var apiRouter = express.Router();
  var Job = require('../models/model.job');


  /* GET users listing. */
  apiRouter
    .get('/api/job/:__id', function(req, res, next) {
      var __id = req.params.__id;
      
      Job.findById(__id, function(err, job) {
        if (err) res.send(err);

        res.json(job._doc);
      });
    })

    .get('/api/jobs/:limit/:sortBy/:sortByDirection/:page?', function(req, res, next) {
      var limit = parseInt(req.params.limit);
      var page = parseInt(req.params.page || 0);
      var sortBy = req.params.sortBy;
      var sortByDirection = parseInt(req.params.sortByDirection);
      
      Job.find()
      .limit(limit)
      .skip(limit * page)
      .sort({sortBy: sortByDirection})
      .exec(function(err, jobs) {
        if (err) res.send(err);

        res.json(jobs);
      });
    })

    .post('/api/job', function(req, res, next) {
      
      var newJob = new Job(req.body);

      // save the user
      newJob.save(function(err) {
          if (err)
              throw err;

          res.send({
            status: 'ok', 
            message: (newJob.__id? 'Job added successfully!': 'Job updated successfully!')
          });

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