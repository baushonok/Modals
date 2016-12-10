const gulp = require( 'gulp' );

const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const autoprefixer = require( 'gulp-autoprefixer' );

const watch = require('gulp-watch');

const browserify = require( 'browserify' );
const tsify = require( 'tsify' );
const source = require( 'vinyl-source-stream' );
const buffer = require( 'vinyl-buffer' );
const sourcemaps = require( 'gulp-sourcemaps' );
const uglify = require( 'gulp-uglify' );
const gulpUtil = require( 'gulp-util' );


gulp.task('default', function () {
  return gulp.src('./styles/src/*.css')
  .pipe(
        postcss([
          require('precss')({ /* options */ }),
          require('postcss-color-function')({ /* options */ })
        ])
    )
    .pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe( cssnano() )
    .pipe(
        gulp.dest('./styles/')
    );
});

//gulp.task(
//	'default',
//	function ()
//	{
//		gulp.src( './styles/common.src/**/*.less' )
//			.pipe( cssNdb() )
//			.pipe( concat( 'common.less' ) )
//			.pipe( less() )
//			.pipe(autoprefixer({
//				browsers: ['last 2 versions'],
//				cascade: false
//			}))
//			.pipe( cssnano() )
//			.pipe( gulp.dest( './styles/' ) );
//	}
//);

gulp.task(
	'watch',
	function ()
	{
		watch( './styles/common.src/**/*.less', function()
		{
			gulp.start( 'default' );
		});
	}
);

gulp.task(
	'ts',
	function ()
	{
		var entryFiles;
		var outputFile;
		var destinationDir;

		entryFiles = './scripts/common.src/main.ts';
		outputFile = 'common.js';
		destinationDir = './scripts/';

		return browserify(
			entryFiles,
			{
				debug: true
			}
		)
			.plugin(
				'tsify',
				{
					target: 'ES5',
					noImplicitAny: true
				}
			)
			.bundle()
			.pipe( source( outputFile ) )
			.pipe( buffer() )
			.pipe( sourcemaps.init( {loadMaps: true} ) )
			.pipe( uglify() )
			.on( 'error', gulpUtil.log )
			.pipe( sourcemaps.write( './' ) )
			.pipe( gulp.dest( destinationDir ) );
	}
);
