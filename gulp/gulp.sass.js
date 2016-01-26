'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var header = require('gulp-header')
var changed = require('gulp-changed')
var filesize = require('gulp-filesize')
var minifyCss = require('gulp-cssnano')
var bourbon = require('node-bourbon')
var banner = require('../configs/banner')
var paths = require('../configs/paths.json')
var sassOptions = {
    style: 'compressed',
    includePaths: bourbon.includePaths
}

module.exports = {
	styles: function() {
		return gulp.src(paths.css.src)
			.pipe(changed(paths.css.src))
			.pipe(sass(sassOptions))
			.pipe(rename({suffix: '.min'}))
			.pipe(minifyCss())
			.pipe(header(banner))
			.pipe(gulp.dest(paths.css.dest))
			.pipe(filesize())
	},
	devstyles: function() {
		return gulp.src(paths.css.src)
			.pipe(changed(paths.css.src))
			.pipe(sass(sassOptions))
			.pipe(gulp.dest(paths.css.dest))
	}
}
