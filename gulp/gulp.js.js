'use strict'

var gulp = require('gulp')
var babel = require('gulp-babel')
var rename = require('gulp-rename')
var jshint = require('gulp-jshint')
var uglify = require('gulp-uglify')
var header = require('gulp-header')
var changed = require('gulp-changed')
var filesize = require('gulp-filesize')
var stylish = require('jshint-stylish')
var banner = require('../configs/banner')
var paths = require('../configs/paths.json')

module.exports = {
	scripts: function() {
		return gulp.src(paths.js.src)
			.pipe(changed(paths.js.src))
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(uglify())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(header(banner))
			.pipe(gulp.dest(paths.js.dest))
	},
	devscripts: function() {
		return gulp.src(paths.js.src)
			.pipe(changed(paths.js.src))
			.pipe(babel({
				presets: ['es2015']
			}))
    	.pipe(gulp.dest(paths.js.dest))
	},
	jshint: function() {
		return gulp.src(['./**/*.js', '!node_modules/**/*', '!public/js/**/*', '!public/app/**/*', '!public/app/build/**/*'])
			.pipe(babel())
			.pipe(jshint())
			.pipe(jshint.reporter(stylish, { verbose: true }))
	}
}
