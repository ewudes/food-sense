var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

function style(done){
  gulp.src('scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogConsole: true
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
  done()
}

function sync(done){
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000
  })
}

function browserReload(done){
  browserSync.reload()
}

function watch(){
  gulp.watch('./scss/**/*', style)
  gulp.watch('./*.html', browserReload)
}

gulp.task('default', gulp.parallel(watch, sync))