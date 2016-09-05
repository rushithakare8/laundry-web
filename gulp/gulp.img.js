/* eslint import/no-extraneous-dependencies: "off" */
const gulp = require('gulp');
// const imagemin = require('gulp-imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminOptipng = require('imagemin-optipng');
const paths = require('../configs/paths.json');

module.exports = {
  img() {
    return gulp.src(paths.img.src).pipe(gulp.dest(paths.img.dest));
  },
  svg() {
    return gulp.src(paths.svg.src).pipe(gulp.dest(paths.img.dest));
  },
};
