var NwBuilder = require('nw-builder');
var gulp = require('gulp');

gulp.task('nw', function () {
  var nw = new NwBuilder({
    version: '0.12.3',
    files: ['./site/**'],
    macIcns: './resource/image/silk-blue.png',
    platforms: ['osx', 'linux']
  });

  // Log stuff you want
  nw.on('log', function (msg) {
    //console.log('node-webkit-builder', msg);
  });

  // Build returns a promise, return it so the task isn't called in parallel
  return nw.build().catch(function (err) {
    console.log('nw-builder', err);
  });
});
