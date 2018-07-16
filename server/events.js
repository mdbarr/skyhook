'use strict';

const EventEmitter = require('events');
const inherits = require('util').inherits;

function Events(skyhook) {
  const self = this;

  EventEmitter.call(this);

  self.skyhook = skyhook;

  return self;
}

inherits(Events, EventEmitter);

module.exports = function(skyhook) {
  return new Events(skyhook);
};
