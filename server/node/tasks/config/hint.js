/**
 * Run jshint
 *
 * ---------------------------------------------------------------
 *
 *
 */
module.exports = function(gulp, plugins, growl) {

  gulp.task('hint', function() {
    return gulp.src(['api/controllers/**/*.js', 'api/models/**/*.js', 'test/**/*.js'])
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.if(growl, plugins.notify({
        message: 'hint task complete'
      })));
  });
};