/* eslint import/no-extraneous-dependencies: 0 */
const gulp = require('gulp');
const jsTasks = require('./gulp/gulp.js');
const paths = require('./configs/paths.json');
const sassTasks = require('./gulp/gulp.sass');
const imgTasks = require('./gulp/gulp.img.js');
const reactTasks = require('./gulp/gulp.react');

gulp.task('mainjs', jsTasks.main);

gulp.task('routesjs', jsTasks.routes);

gulp.task('scripts', ['mainjs', 'routesjs']);

gulp.task('devAtomicCSS', sassTasks.devatomic);

gulp.task('atomicCSS', sassTasks.atomic);

gulp.task('styles', sassTasks.styles);

gulp.task('devstyles', sassTasks.devstyles);

gulp.task('react', reactTasks.react);

gulp.task('img', imgTasks.img);

gulp.task('svg', imgTasks.svg);

// Rerun the task when a file changes
gulp.task('watch', () => {
  gulp.watch(paths.acss.src, ['devAtomicCSS', 'atomicCSS']);
  gulp.watch(paths.js.src, ['scripts']);
  gulp.watch(paths.css.src, ['styles', 'devstyles']);
  gulp.watch(paths.react.src, ['react']);
  gulp.watch(paths.img.src, ['img', 'svg']);
});

gulp.task('dev', ['watch', 'scripts', 'devAtomicCSS', 'atomicCSS', 'styles', 'devstyles', 'react', 'img', 'svg']);
gulp.task('default', ['scripts', 'devAtomicCSS', 'atomicCSS', 'styles', 'devstyles', 'react', 'img', 'svg']);
