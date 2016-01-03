'use strict'

var gulp = require('gulp')
var uglify = require('gulp-uglify')
var header = require('gulp-header')
var rename = require('gulp-rename')
var webpack = require('webpack-stream')
var banner = require('../configs/banner')
var paths = require('../configs/paths.json')
var webpack_config = require('../webpack.config')

module.exports = {
	react: function() {
		return gulp.src(paths.react.main)
			.pipe(webpack(webpack_config))
			.pipe(gulp.dest(paths.react.dest))
			.pipe(rename({ suffix: '.min' }))
			.pipe(uglify())
			.pipe(header(banner))
			.pipe(gulp.dest(paths.react.dest))
	}
}
