(function() {
  'use strict';

  angular.module('app.main', [])
    .controller('MainController', MainController);

  /**
   * @ngdoc controller
   * @name MainController
   * @description The main controller for the main.template.html. App initialization and global
   * functionality should go here.
   *
   * @requires BltApi
   * @requires BltAuth
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   * @requires https://docs.angularjs.org/api/ng/service/$scope
   * @module app.main
   */
  function MainController( bltApi, bltAuth ) {
    var ctrl = this;

    ctrl.logout = logout;

    activate();

    /**
     * @function activate
     * @description Automatically activates when the main template is added to the DOM. Set up inital
     * properties and optionally connect to the ngBolt authentication service.
     * @module MainController
     */
    function activate() {
      ctrl.title = '@@title';

      bltAuth.onauthenticate = function() {
        //App is active with an authenticated user. This is an opportunity to retrieve data and activate
        //services for this user.
        bltApi.info("Authenticated callback fired.");
      }

      bltAuth.connect();
    }

    /**
     * @function logout
     * @description Logout of the application.
     * @module MainController
     */
    function logout() {
      bltAuth.logout();
    }
  }

  MainController.$inject = ['BltApi', 'BltAuth'];
})();