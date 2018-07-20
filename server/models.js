'use strict';

function Models(skyhook) {
  const self = this;

  ////////////////////
  // Context
  self.context = function(request, response, next) {
    const timestamp = skyhook.util.timestamp();
    const model = {
      object: 'context',
      requestId: skyhook.store.generateId(),
      timestamp,
      request,
      response,
      next,

      session: null,
      user: null,
      organization: null
    };

    if (request.session) {
      model.session = request.session;
      model.user = request.session.user;
    }

    model.send = function(statusCode, object) {
      if (!skyhook.config.silent) {
        console.pp(object);
      }

      if (typeof statusCode !== 'number') {
        object = statusCode;
        statusCode = 200;
      }

      response.send(statusCode, object);
      response.end();
      next();
    };

    model.error = function(statusCode, message) {
      if (!skyhook.config.silent) {
        console.log('ERROR'.rgb('#bf2c30'), message);
      }

      if (typeof statusCode !== 'number') {
        message = statusCode;
        statusCode = 400;
      }

      response.send(statusCode, {
        code: statusCode,
        message
      });

      next(false);
    };

    return model;
  };

  ////////////////////
  // Session
  self.session = function({
    _id, user, ttl
  }) {
    const model = {
      _id: _id || skyhook.store.generateId(),
      object: 'session',
      ttl: ttl || skyhook.config.cache.sessionTTL,
      user: user._id
    };

    return model;
  };

  ////////////////////
  // User

  self.user = function({
    _id, email, password, username, fullName, avatar, account
  }) {
    const model = {
      _id: _id || skyhook.store.generateId(),
      object: 'user',
      email,
      password,
      username,
      fullName,
      avatar: avatar || null,
      account
    };

    return model;
  };

  ////////////////////
  // Account
  self.account = function({
    _id, user, code, data, features, lambdas, logs
  }) {
    const model = {
      _id: _id || skyhook.store.generateId(),
      object: 'account',
      user: skyhook.util.id(user),
      code: code || '',
      data,
      features: features || [],
      lambdas: lambdas || [],
      logs
    };

    return model;
  };

  ////////////////////
  // Lambda

  self.lambda = function({
    _id, account, name, code
  }) {
    const model = {
      _id: _id || skyhook.store.generateId(),
      object: 'lambda',
      account: skyhook.util.id(account),
      name: name || '',
      code: code || ''
    };

    return model;
  };

  return self;
}

module.exports = function(skyhook) {
  return new Models(skyhook);
};
