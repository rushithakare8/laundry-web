/* eslint import/no-extraneous-dependencies: "off" */
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const banner = require('../configs/banner');
const paths = require('../configs/paths.json');
const webpackConfig = require('../webpack.config');

module.exports = {
  react() {
    return gulp.src(paths.react.main)
      .pipe(webpack(webpackConfig.appConfig))
      .pipe(gulp.dest(paths.react.dest))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(header(banner))
      .pipe(gulp.dest(paths.react.dest));
  },
};
