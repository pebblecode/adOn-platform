var AudioContext = window.AudioContext || window.webkitAudioContext;

angular.module('adon')
  .service('Sender', [
    '$rootScope',
    '$q',
    function($rootScope, $q) {
      var adOnSoundLib = require('./lib/index.js');

      var SoundTools = {};
      SoundTools.context = new AudioContext();
      SoundTools.codec = new adOnSoundLib.Codec({
        characters: 'abcdefghijklmnopqrstuvwxyz0123456789'
      });

      SoundTools.sender = new adOnSoundLib.Sender({}, SoundTools.codec, SoundTools.context);

      SoundTools.exporter = new adOnSoundLib.Export({playOutput: false}, SoundTools.codec, SoundTools.context)

      return SoundTools;
    }
]);
