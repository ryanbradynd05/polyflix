'use strict';

module.exports = function(config) {

  config.set({
    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    reporters: ['progress', 'coverage'],

    files: ['src/app/partials/**/*.hbs'],

    plugins : [
        'karma-phantomjs-launcher',
        'karma-jasmine',
        'karma-coverage',
        'karma-ng-html2js-preprocessor'
    ],
    preprocessors: {
      '.tmp/serve/app/index.js': 'coverage',
      'src/app/partials/**/*.hbs': 'html2js'
    },
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    ngHtml2JsPreprocessor: {
        moduleName: 'templates'
    }
  });
};
