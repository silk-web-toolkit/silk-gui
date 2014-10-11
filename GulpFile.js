var NwBuilder = require('node-webkit-builder');
var gulp = require("gulp");

gulp.task('nw', function () {

  var nw = new NwBuilder({
    files: './site/**', // use the glob format
    platforms: ['osx']  //['win', 'osx', 'linux32', 'linux64']
  });

  // Log stuff you want
  nw.on('log',  console.log);

  // Build returns a promise
  nw.build().then(function () {
    console.log('all done!');
  }).catch(function (error) {
    console.error(error);
  });

  // And supports callbacks
  nw.build(function(err) {
    if(err) console.log(err);
  })
});
