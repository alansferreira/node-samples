module.exports = function(app, passport) {

  var express = require('express');
  var apiRouter = express.Router();
  var Car = require('../models/model.car');


  /* GET users listing. */
  apiRouter
    .get('/api/car', function(req, res, next) {
      Car.find(function(err, users) {
        if (err) res.send(err);

        res.json(users);
      });
    })


    //# 
    .post('/api/car', isLoggedIn, function(req, res, next) {
      var newCar = new Car(req.body);
      newCar.save(function(err, car) {
        if (err) res.send(err);
        res.json(car);
      });
    })

    .delete('/api/car', isLoggedIn, function(req, res, next) {
      var delCar = req.body;

      Car.remove({_id: delCar._id}, function(err) {
        if (err) res.send(err);
        
        res.send({status: 'ok', message: 'removed success!'});
      });
    })

  ;

  return apiRouter
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}