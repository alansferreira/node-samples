module.exports = function(app, passport) {

  var express = require('express');
  var apiRouter = express.Router();
  var Store = require('../models/model.store');


  /* GET users listing. */
  apiRouter
    /**
     * api/store/avaible_marks 
     * api/store/avaible_marks?mark=honda
     * api/store/avaible_marks?mark=honda&model=civic
     */
    .get('/api/store/avaible_marks', function(req, res) {
      var agg_options = [];
      
      // don´t change the agg_options array order
      if(req.query) agg_options.push({$match: req.query});
      agg_options.push({$group: {_id: '$mark', "models": {'$push': '$model'}}});
      
      Store.aggregate(agg_options, function (err, result) {
        if (err) res.send(err); 
        
        res.send(result);
      });
    })
    .get('/api/store', function(req, res) {
      Store.find(function(err, users) {
        if (err) res.send(err);

        res.json(users);
      });
    })
    .post('/api/store/attach/:id', canUserModifyStore, function(req, res) {

      if (!req.files) return res.status(400).send('No files were uploaded.');

      var _id = req.params.id;
      
      var fn_attach = function(id, file){
        console.log('File ' + file.file.name + ' uploaded!');
        res.status(200).send('File ' + file.file.name + ' uploaded!');
      };

      if(!_id){
        var newStore = new Store(req.body);

        newStore.save(function(err, store) {
          if (err) res.send(err);
          _id = store._id;

          fn_attach(_id, req.files);
        });

      }else{
          fn_attach(_id, req.files);
      }

    })
    .post('/api/store', canUserModifyStore, function(req, res) {
      var newStore = new Store(req.body);

      // if (!req.files) return res.status(400).send('No files were uploaded.');
      // console.log(req.files);
      // res.status(200).send('Files uploaded!');
      var fn_callback = function(err, Store) {
        if (err) return res.send(err);
        
        res.status(200).json(Store);
      };
      
      newStore.save(fn_callback);

    })
    .delete('/api/store', canUserModifyStore, function(req, res) {
      var delStore = req.body;

      Store.remove({_id: delStore._id}, function(err) {
        if (err) res.send(err);
        
        res.send({status: 'ok', message: 'removed success!'});
      });
    });

  return apiRouter;
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, Storery on 
  if (req.isAuthenticated())
    return next();

}

function canUserModifyStore(req, res, next) {
  return next();
  // if(!req.isAuthenticated()){
  //   res.send({status: 'error', message: 'you do not authorized to change this record!'})
  //   return null;
  // } 

  // var user = req.user._doc;
  // var Store = req.body;

  // Store.findById(Store._id)
  // .exec(function(err, _Store){
  //   if(Store.owner._id==user._id) return next();

  //   res.send({status: 'error', message: 'you do not authorized to change this record!'})
  //   return null;

  // });

}