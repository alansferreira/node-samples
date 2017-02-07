var appConfig = require('../config/app.config');

module.exports = function(app, passport){

  app.use(appConfig.appContextRootName, 
    require('./api.user')(app, passport), 
    require('./api.job')(app, passport)
  );

};
