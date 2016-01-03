'use strict'

var gulp = require('gulp')
var imagemin = require('gulp-imagemin')
var imageminOptipng = require('imagemin-optipng')
var paths = require('../configs/paths.json')

module.exports = {
	img: function() {
		return gulp.src(paths.img.src)
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          use: [ imageminOptipng() ]
      }))
      .pipe(gulp.dest(paths.img.dest))
	}
}
