/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-data-sails',

  contentFor: function (what, config) {
    var options;
    if (what === 'body') {
      if (config.APP && config.APP.emberDataSails) {
        options = config.APP.emberDataSails;
      }
      else {
        options = {};
      }
      if (!options.host) {
        options.host = '';
      }
      if (!options.scriptPath) {
        options.scriptPath = '/js/dependencies/sails.io.js';
      }
      // sails.io.js defaults `reconnection` to false, so a dropped socket never
      // retries. Set before the service connects; the setter throws once the
      // socket is up. Delay/max/jitter are socket.io's own defaults, stated
      // here so they are tunable per environment.
      var socketOptions = {
        autoConnect: false,
        reconnection: options.reconnection !== false,
        reconnectionDelay: options.reconnectionDelay || 1000,
        reconnectionDelayMax: options.reconnectionDelayMax || 5000,
        randomizationFactor: options.randomizationFactor || 0.5,
        emberDataSailsReady: true,
      };

      var assignments = Object.keys(socketOptions)
        .map(function (option) {
          return 'io.sails.' + option + ' = ' + JSON.stringify(socketOptions[option]) + ';';
        })
        .join(' ');

      return '<script type="text/javascript" id="eds-sails-io-script" src="' + options.host + options.scriptPath + '"></script>' +
        '<script type="text/javascript">' + assignments + '</script>';
    }
  }
};
