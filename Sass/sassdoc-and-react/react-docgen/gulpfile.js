var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: '*',
        camelize: true
    });

// Configuration
// -----------------------------------------------------------------------------
var basePaths = {
        src: 'src/',
        dist: 'dist/'
    },
    config = {
        js: {
            glob: basePaths.src + 'components/**/*.js'
        }
    };

/* -----------------------------------------------------------------------------
 * Task - generateDocs
 * Runs a shell command to get the latest component info
 * -------------------------------------------------------------------------- */
gulp.task('generateDocs', $.shell.task('react-docgen src/components --pretty --out src/docs/components.json', {
    quiet: true
}));

/* -----------------------------------------------------------------------------
 * Task - watch
 * Generate CSS and sassdoc documentation when a SASS file is changed
 * -------------------------------------------------------------------------- */
gulp.task('watch', function() {
    gulp.watch(config.js.glob, ['generateDocs']);
});


gulp.task('default', ['generateDocs', 'watch']);
