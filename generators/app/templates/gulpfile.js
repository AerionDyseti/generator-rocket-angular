var $ = require('gulp-load-plugins')({pattern: ['gulp-*', 'gulp.*', 'merge2']});
var gulp = require('gulp');
var sequence = require('run-sequence');
var argv = require('yargs').argv;
var del = require('del');

// true if --production flag was present.
var isProduction = !!(argv.production);

// Define the paths of everything we're using.
var paths = {
    templates: 'app/src/**/*.view.html',
    appRoot: 'app/src',

    // Sass will check these folders when using @include
    sass: [
        'app/src/*.scss'
    ],

    // include fonts if they exist, especially vendor fonts.
    fonts: [
        'app/fonts/*.*'
    ],

    // Include Images, if they exist.
    images: [
        'app/img/*.*'
    ],

    // 3rd Party Javascript (mostly angular modules)
    javascript: [
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',

        'app/src/app.js',
        'app/src/**/*.js',
        'app/src/**/**/*.js'
    ]
};

// Clean task, which deletes the build folder.
gulp.task('clean', function ()
{
    return del(['build']);
});


// SASS task, which compiles the SCSS into proper CSS.
gulp.task('sass', function ()
{
    return gulp.src('./app/src/app.scss')
        .pipe($.sass({ outputStyle: (isProduction) ? 'compressed' : 'nested' }))
        .pipe($.autoprefixer({ browsers: ['last 2 versions', 'ie 10'] }))
        .pipe(gulp.dest('build/css'));
});


// Master copy task, which will copy fonts, images, and html to their respective build folders.
gulp.task('copy', ['copy:fonts', 'copy:images', 'copy:html']);

// copy fonts to their build folder.
gulp.task('copy:fonts', function () {
    return gulp.src(paths.fonts).pipe(gulp.dest('build/fonts'));
});

// copy all images to their build folder.
gulp.task('copy:images', function () {
    return gulp.src(paths.images).pipe(gulp.dest('build/images'));
});

// copies any HTML from the app root to the build folder.
gulp.task('copy:html', function () {
    return gulp.src(paths.appRoot + '/*.html').pipe(gulp.dest('build'));
});

// Master uglify task. Not sure why this is here.
gulp.task('uglify', ['uglify:app']);

// Uglify the App specifically.
gulp.task('uglify:app', function ()
{
    var uglify = $.if(isProduction, $.uglify().on('error', function (e) { console.log(e); }));

    return $.merge2(
        gulp.src(paths.javascript),
        gulp.src(paths.templates)
            .pipe($.angularTemplatecache({module: '<%= app_name %>'}))
        )
        .pipe($.ngAnnotate())
        .pipe(uglify)
        .pipe($.concat('app.js'))
        .pipe(gulp.dest('build/js/'));
});

/**
 * Versions app.js and app.css (or any .js/.css files in build/assets) with a hash of the contents.
 */
gulp.task('assets:version', function () {
    return gulp.src(['build/**/*.js', 'build/**/*.css'])
        .pipe($.rev())
        .pipe(gulp.dest('build/'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('build/'));
});

/**
 * Replaces any referenced javascript/css files in build/index.html with their versioned filenames created with assets:version. (ex: app-2e719dda3b.js)
 */
gulp.task('assets:replaceVersion', function () {
    var manifest = gulp.src('build/rev-manifest.json');

    return gulp.src('build/index.html')
        .pipe($.revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest('build'));
});

// Regular build.
gulp.task('build', function (cb) {
    sequence('clean', ['copy', 'sass', 'uglify'], cb);
});

// This task builds and also versions the app.js and app.css in index.html. (This is called on staging and production with the --production flag)
gulp.task('build-versioned', function (cb) {
    sequence('clean', ['copy', 'sass', 'uglify'], 'assets:version', 'assets:replaceVersion', cb);
});

gulp.task('default', ['build'], function () {
    gulp.watch(['app/src/**/*.scss', 'app/src/*.scss'], ['sass']);    // Watch SCSS
    gulp.watch(['app/src/*.js', 'app/src/**/*.js'], ['uglify']);    // Watch Javascript
    gulp.watch(['app/images/*.*'], ['copy:images']);    // Watch Images
    gulp.watch(['app/fonts/*.*'], ['copy:fonts']);    // Watch Fonts
    gulp.watch(['app/src/**/*.html'], ['uglify']);     // Watch Templates
    gulp.watch(['app/src/*.html'], ['copy:html']);      // Copy Base Files
});

// Calls the webserver.
gulp.task('webserver', function () {
    gulp.src('build') .pipe($.webserver({ livereload: true, fallback: 'index.html', port: 3001 }));
});