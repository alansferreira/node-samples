
module.exports = function(app, passport){

  app.use('/myapp/', require('./api.user')(app, passport));

};
