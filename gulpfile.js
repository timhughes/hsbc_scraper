var gulp = require('gulp'),
    artoo = require('gulp-artoo'),
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify');

// Bookmarklets
gulp.task('bookmark.dev', function() {
  return artoo.blank('hsbc-scraper.bookmark.dev.js')
    .pipe(artoo({
      random: true,
      loadingText: null,
      settings: {
        scriptUrl: 'https://localhost:8000/hsbc-scraper.js',
        env: 'dev'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('bookmark.prod', function() {
  return gulp.src('./hsbc-scraper.js')
    .pipe(uglify())
    .pipe(rename('hsbc-scraper.bookmark.prod.js'))
    .pipe(artoo())
    .pipe(gulp.dest('./build'));
});

// Server
gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      directoryListing: true,
      port: 8000,
      https: true
    }));
});

// Macro tasks
gulp.task('work', ['serve']);
gulp.task('bookmarklets', ['bookmark.dev', 'bookmark.prod']);
gulp.task('default', ['bookmark.dev', 'bookmark.prod']);
