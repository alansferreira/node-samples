
module.exports = function(app){

  app.use('/', require('./view.index'));
  app.use('/', require('./view.signin'));

};
