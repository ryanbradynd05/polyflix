/* jshint node: true */

module.exports = function(environment) {
  var restURL = 'http://localhost:3000';
  var ENV = {
    modulePrefix: 'polyflix',
    environment: environment,
    baseURL: '/',
    restURL: restURL,
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'connect-src': "'self' " + restURL,
      'img-src': "'self' http://image.tmdb.org https://d3a8mw37cqal2z.cloudfront.net",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' localhost:34530 0.0.0.0:34530"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
