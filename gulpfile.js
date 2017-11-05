'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

var uglify = require('gulp-uglify');
var pump = require('pump');
 
gulp.task('default', () =>
    gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'))
);

gulp.task('press', function (cb) {
    pump([
          gulp.src('build/*.js'),
          uglify(),
          gulp.dest('build')
      ],
      cb
    );
  });