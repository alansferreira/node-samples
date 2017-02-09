require.config({
    //urlArgs: "v=" + new Date().getTime(), 
    waitSeconds: 300,
    baseUrl: "/",
    // alias libraries paths
    paths: {
        'app'             : 'app',
        'angular'           : 'bower/angular/angular.min',
        // 'ngAria'            : 'bower/angular-aria/angular-aria.min',
        // 'ngAnimate'         : 'bower/angular-animate/angular-animate.min',
        // 'ngI18n'            : 'bower/angular-I18n/angular-locale_pt-br',
        // 'ngMaterialIcons'   : 'bower/angular-material-icons/angular-material-icons.min',
        // 'ngMessages'        : 'bower/angular-messages/angular-messages.min',
        // 'ngResource'        : 'bower/angular-resource/angular-resource.min',
        // 'ngRoute'           : 'bower/angular-route/angular-route.min',
        // 'ngSanitize'        : 'bower/angular-sanitize/angular-sanitize.min',
        // 'ngMaterial'        : 'bower/angular-material/angular-material.min',
    },
    
    // angular does not support AMD out of the box, put it in a shim
    shim: {
        app: {
            exports: "app",
            deps: [
                'angular'//, 'ngMaterial', 'ngAria', 'ngI18n', 'ngMaterialIcons', 'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize'
            ]
        },

         angular           : { exports: 'angular'}, 
        // ngAria            : {deps:['angular']},
        // ngAnimate         : {deps:['angular']},
        // ngI18n            : {deps:['angular']},
        // ngMaterialIcons   : {deps:['angular']},
        // ngMessages        : {deps:['angular']},
        // ngResource        : {deps:['angular']},
        // ngRoute           : {deps:['angular']},
        // ngSanitize        : {deps:['angular']},

        // ngMaterial        : {deps:['angular', 'ngAnimate', 'ngAria', 'ngI18n', 'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize']},

     },

});

require(['app'], function(app){
     angular.element(document).ready(function () {
         angular.bootstrap(document, ['myapp']); 
     });
});
