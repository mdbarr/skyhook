'use strict';

const async = require('async');

////////////////////

const defaults = {
  name: 'skyhook',

  api: {
    port: 2928
  },

  plugins: {},

  datastore: {
    engine: 'mongodb',
    url: 'mongodb://localhost:27017',
    database: 'skyhook'
  },

  silent: false
};

////////////////////

function Skyhook(config = {}) {
  const self = this;

  ////////////////////

  self.util = require('./util')(self);

  self.version = require('../package.json').version;
  self.config = Object.merge(defaults, config);
  self.util.generateLocalPassword();

  ////////////////////

  self.events = require('./events')(self);

  self.store = require('./datastore')(self);

  self.server = require('./apiServer')(self);

  self.models = require('./models')(self);

  ////////////////////

  self.boot = function (callback) {
    async.parallel([ self.store.load, self.server.boot ], function(error) {
      callback = self.util.callback(callback);

      if (error) {
        console.log('Error in boot:', error);
        return callback(error);
      }
      return callback();
    });
  };

  self.shutdown = function() {
    self.server.close();
    self.store.close();
  };

  ////////////////////

  return self;
}

////////////////////

module.exports = Skyhook;
