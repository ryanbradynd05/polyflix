'use strict';

module.exports = function(config) {

  config.set({
    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    reporters: ['progress', 'coverage'],

    plugins : [
        'karma-phantomjs-launcher',
        'karma-jasmine',
        'karma-coverage'
    ],
    preprocessors: {
      '.tmp/serve/app/index.js': 'coverage'
    },
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
  });
};
