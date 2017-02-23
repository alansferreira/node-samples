module.exports = function(app, passport) {

  var express = require('express');
  var apiRouter = express.Router();
  var Mark = require('../models/model.mark');


  /* GET users listing. */
  apiRouter
    .get('/api/mark/:name?', function(req, res) {
      if(req.params.name){
        Mark.find({name: name}, function(err, marks) {
          if (err) res.send(err);

          res.json(marks);
        });

      }else{
        Mark.find(function(err, marks) {
          if (err) res.send(err);

          res.json(marks);
        });
      }
    })
    ;

  return apiRouter;
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