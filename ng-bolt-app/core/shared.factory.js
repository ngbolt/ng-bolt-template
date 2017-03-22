(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('sharedFactory', sharedFactory);

  sharedFactory.$inject = [];
  function sharedFactory() {
    var factory = {};

    return factory;
  }
})();