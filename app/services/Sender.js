angular.module('adon')
  .service('Sender', [
    '$rootScope',
    '$q',
    function($rootScope, $q) {
      var adOnSoundLib = require('./lib/index.js')
      var sender = new adOnSoundLib.Sender()

      return sender;
    }
]);
