import Ember from 'ember';

export var LEVELS = 'debug info notice warn error'.split(' ');

const levelMap = {
  notice: 'log'
};
let methods = {};

LEVELS.forEach(function (level) {
  methods[level] = Ember.run.bind(console, levelMap[level] || level, '[ed-sails]');
});

/**
 * Mix logging methods in our class depending on the configured log level
 * @since 0.0.10
 * @class WithLoggerMixin
 * @extensionFor Ember.Object
 */
export default Ember.Mixin.create(methods);
