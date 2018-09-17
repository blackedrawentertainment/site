var gulp = require('gulp');
//Requires the gulp-sass plugin
var sass = require('gulp-sass');
var globbing = require('gulp-css-globbing');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');

gulp.task('sass', function(){
	return gulp.src('src/styles/main.scss')
	.pipe(globbing({
		//config to use scss
		extensions: ['.scss']
	}))
	.pipe(sass()) //using gulp-sass
	.pipe(gulp.dest('build/css/main.css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'build'
		}
	})
});

gulp.task('pug', function(){
	return gulp.src('src/html/build/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('build/html'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('watch', ['sass', 'pug', 'browserSync'], function(){
	gulp.watch('src/styles/**/*.scss', ['sass'], browserSync.reload);
	gulp.watch('src/html/**/*.pug', ['pug'], browserSync.reload);
	gulp.watch('build/*.html', browserSync.reload);
	gulp.watch('build/js/**/*', browserSync.reload);
	gulp.watch('build/css/*.css', browserSync.reload);
	
});