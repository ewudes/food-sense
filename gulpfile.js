const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass')); // Важно: используем Dart Sass
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const spritesmith = require('gulp.spritesmith');

function style(done) {
  gulp.src('scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) // Обработка ошибок корректно
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
  done();
}

function sync(done) {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000
  });
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function watch() {
  gulp.watch('./scss/**/*', style);
  gulp.watch('./*.html', browserReload);
}

gulp.task('sprite', function () {
  const spriteData = gulp.src('img/icon/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    padding: 40
  }));
  return spriteData.pipe(gulp.dest('img/sprites/'));
});

gulp.task('default', gulp.parallel(watch, sync));
