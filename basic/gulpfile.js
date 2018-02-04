const gulp = require('gulp')

gulp.task('webpack', () => {
  const webpack = require('webpack-stream')
  const config = require('./webpack.config.js')

  gulp.src('./src/scripts/**/*.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./dist/scripts'))
})

gulp.task('sass', () => {
  const sass = require('gulp-sass')
  gulp.src('./src/styles/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('default', ['webpack', 'sass'])