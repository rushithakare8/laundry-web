'use strict'

// include gulp
var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var jsTasks = require('./gulp/gulp.js')
var paths = require('./configs/paths.json')
var sassTasks = require('./gulp/gulp.sass')
var imgTasks = require('./gulp/gulp.img.js')
var reactTasks = require('./gulp/gulp.react')

gulp.task('scripts', jsTasks.scripts)

gulp.task('devscripts', jsTasks.devscripts)

gulp.task('styles', sassTasks.styles)

gulp.task('devstyles', sassTasks.devstyles)

gulp.task('react', reactTasks.react)

gulp.task('img', imgTasks.img)

gulp.task('svg', imgTasks.svg)

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.js.src, ['scripts', 'devscripts'])
    gulp.watch(paths.css.src, ['styles', 'devstyles'])
    gulp.watch(paths.react.src, ['react'])
    gulp.watch(paths.img.src, ['img', 'svg'])
})

gulp.task('default', ['watch', 'scripts', 'devscripts', 'styles', 'devstyles', 'react', 'img', 'svg'])
