var gulp = require('gulp'),
  qunit = require('node-qunit-phantomjs');

gulp.task('test', function() {
  qunit('./w2/index.html');
});

gulp.task('watch', function() {
  gulp.watch('*/**', ['test']);
});

gulp.task('default', ['watch']);