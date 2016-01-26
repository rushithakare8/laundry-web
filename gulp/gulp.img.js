'use strict'

var gulp = require('gulp')
var imagemin = require('gulp-imagemin')
var imageminOptipng = require('imagemin-optipng')
var imageminJpegtran = require('imagemin-jpegtran')
var paths = require('../configs/paths.json')

module.exports = {
	img: function() {
		return gulp.src(paths.img.src)
      .pipe(imagemin({
          progressive: true,
          use: [ imageminOptipng(), imageminJpegtran() ]
      }))
      .pipe(gulp.dest(paths.img.dest))
	},
	svg: function() {
		return gulp.src(paths.svg.src)
      .pipe(gulp.dest(paths.img.dest))
	}
}
