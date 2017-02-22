module.exports = function(app, passport) {

  var express = require('express');
  var apiRouter = express.Router();
  var User = require('../models/model.user');


  /* GET users listing. */
  apiRouter
    .get('/api/user', function(req, res, next) {
      User.find(function(err, users) {
        if (err) res.send(err);

        res.json(users);
      });
    })


    .get('/api/user/login-status', loginStatus)

    //###### warning signin and signup does not redirect correctly must be fixed
    //# signin
    .post('/api/user/signin', passport.authenticate('local-signin', {}), loginStatus)

    //###### warning signin and signup does not redirect correctly must be fixed
    //# signup
    .post('/api/user/signup', passport.authenticate('local-signup', {}, loginStatus))

    .get('/api/user/signout', function(req, res, next){
      req.logout();
      
      if(next) return next();
      
    }, loginStatus)
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