'use strict';

const MongoClient = require('mongodb').MongoClient;

function DataStore(skyhook) {
  const self = this;

  self.generateId = skyhook.util.generateId;

  self.load = function(done) {
    MongoClient.connect(skyhook.config.datastore.url, {
      useNewUrlParser: true
    }, function(error, client) {
      if (error) {
        return done(error);
      }
      console.log(`Skyhook DB connected to ${ skyhook.config.datastore.url }`);

      self.client = client;
      self.db = client.db(skyhook.config.datastore.database);

      self.close = client.close;

      self.users = self.db.collection('users');

      done();
    });
  };

  return self;
}

module.exports = function(skyhook) {
  return new DataStore(skyhook);
};
