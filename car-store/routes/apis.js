
module.exports = function(app, passport){

  app.use('/', require('./api.user')(app, passport));
  app.use('/', require('./api.car')(app));

};