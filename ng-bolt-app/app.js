/**
 * @name Template App
 */
(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name app
   * @description The app module for the ngBolt Template App
   * @memberof Template App
   */
  angular.module('app', [
    // List app modules below
    'app.core',
    'app.main'
  ])
    .config(config)
    .run(run);

  /**
   * @ignore
   */
  config.$inject = ['$compileProvider', '$routeProvider', '$locationProvider', 'views', 'config'];

  /**
   * @func config
   * @memberof app
   * @desc Configures the application. This is where we load views from `./config/views.json` and programmatically
   * add them to the routeProvider. You can also make other
   * [configurations](https://github.com/johnpapa/angular-styleguide/tree/master/a1#configuration-1) to the app module
   * that must occur before the app runs.
   */
  function config( $compileProvider, $routeProvider, $locationProvider, views, config ) {
    // For a performance boost when running in production, make debugInfoEnababled false.
    // (https://docs.angularjs.org/guide/production)
    $compileProvider.debugInfoEnabled(false);

    for ( var i = 0; i < views.length; i++ ) {
      $routeProvider.when(views[i].path, views[i].route);
    }

    $locationProvider.html5Mode(config.html5mode);
  }

  /**
   * @ignore
   */
  run.$inject = ["$route"];

  /**
   * @func run
   * @memberof app
   * @desc Initialize the app module. Initialize code that needs to be [run](https://github.com/johnpapa/angular-styleguide/tree/master/a1#run-blocks) when the application starts.
   */
  function run( $route ) {
    // FastClick to remove 300ms delay on touch screen click events.
    FastClick.attach(document.body);

    // When ng-view is inside a ng-include the instantiation is delayed and $route instantiation is delayed as well, 
    // and $route will miss the location change event (and routing will not be performed at all). To bypass this, 
    // invoke the $route update function on application initialization.
    $route.reload();
  }
})();