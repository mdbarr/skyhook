'use strict';

const restify = require('restify');
const cookieParser = require('restify-cookies');

function ApiServer(skyhook) {
  const self = this;

  skyhook.api = restify.createServer({
    name: skyhook.config.name + ' API Server',
    ignoreTrailingSlash: true,
    strictNext: true
  });

  ////////////////////

  skyhook.api.use(restify.pre.sanitizePath());
  skyhook.api.pre(restify.plugins.pre.dedupeSlashes());
  skyhook.api.use(restify.plugins.dateParser());
  skyhook.api.use(restify.plugins.queryParser());
  skyhook.api.use(restify.plugins.bodyParser());
  skyhook.api.use(restify.plugins.authorizationParser());
  skyhook.api.use(cookieParser.parse);

  skyhook.api.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');

    res.header(skyhook.config.name + '-version', skyhook.version);

    if (!skyhook.config.silent) {
      //skyhook.util.logger(req);
    }
    next();
  });

  ////////////////////

  skyhook.api.get('/api', skyhook.util.placeHolder);

  skyhook.api.get('/api/version', function(req, res, next) {
    const context = skyhook.models.context(req, res, next);

    const version = {
      name: skyhook.config.name,
      version: skyhook.version
    };

    context.send(200, version);
  });

  ////////////////////

  self.boot = function(callback) {
    skyhook.api.listen(skyhook.config.api.port, function() {
      if (!skyhook.config.silent) {
        console.log(`Skyhook API Server running on ${ skyhook.config.api.port }`);
      }
      if (callback) {
        callback(null);
      }
    });
  };

  ////////////////////

  return self;
}

module.exports = function (skyhook) {
  return new ApiServer(skyhook);
};
