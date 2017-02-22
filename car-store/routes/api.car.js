module.exports = function(app, passport) {

  var express = require('express');
  var apiRouter = express.Router();
  var Car = require('../models/model.car');


  /* GET users listing. */
  apiRouter
    .get('/api/car', function(req, res) {
      Car.find(function(err, users) {
        if (err) res.send(err);

        res.json(users);
      });
    })


    //# 
    .post('/api/car', canUserModifyCar, function(req, res) {
      var newCar = new Car(req.body);
      newCar.save(function(err, car) {
        if (err) res.send(err);
        res.json(car);
      });
    })

    .delete('/api/car', canUserModifyCar, function(req, res) {
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

}

function canUserModifyCar(req, res, next) {
  if(!req.isAuthenticated()){
    res.send({status: 'error', message: 'you do not authorized to change this record!'})
    return null;
  } 

  var user = req.user._doc;
  var car = req.body;

  Car.findById(car._id)
  .exec(function(err, _car){
    if(car.owner._id==user._id) return next();

    res.send({status: 'error', message: 'you do not authorized to change this record!'})
    return null;

  });

}