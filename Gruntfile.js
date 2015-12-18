'use strict';

module.exports = function (grunt) {

	grunt.initConfig({

		// grunt-contrib-concat
		// https://www.npmjs.com/package/grunt-contrib-concat
		concat: {
		    options: {
	      		// separator: '\n\n\n' ,
	      		process: function(src, filepath) {
			      return '// ' + filepath + '\n' + src;
			    }
	    	},
			js: {
				// se não usar -> comentar ou apagar 
				src: ['bower_components/foundation-sites/js/foundation.core.js',
				      'bower_components/foundation-sites/js/foundation.abide.js',
				      'bower_components/foundation-sites/js/foundation.accordion.js',
				      'bower_components/foundation-sites/js/foundation.accordionMenu.js',
				      'bower_components/foundation-sites/js/foundation.drilldown.js',
				      'bower_components/foundation-sites/js/foundation.dropdown.js',
				      'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
				      'bower_components/foundation-sites/js/foundation.equalizer.js',
				      'bower_components/foundation-sites/js/foundation.interchange.js',
				      'bower_components/foundation-sites/js/foundation.magellan.js',
				      'bower_components/foundation-sites/js/foundation.offcanvas.js',
				      'bower_components/foundation-sites/js/foundation.orbit.js',
				      'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
				      'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
				      'bower_components/foundation-sites/js/foundation.reveal.js',
				      'bower_components/foundation-sites/js/foundation.slider.js',
				      'bower_components/foundation-sites/js/foundation.sticky.js',
				      'bower_components/foundation-sites/js/foundation.tabs.js',
				      'bower_components/foundation-sites/js/foundation.toggler.js',
				      'bower_components/foundation-sites/js/foundation.tooltip.js',
				      'bower_components/foundation-sites/js/foundation.util.box.js',
				      'bower_components/foundation-sites/js/foundation.util.keyboard.js',
				      'bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
				      'bower_components/foundation-sites/js/foundation.util.motion.js',
				      'bower_components/foundation-sites/js/foundation.util.nest.js',
				      'bower_components/foundation-sites/js/foundation.util.timerAndImageLoader.js',
				      'bower_components/foundation-sites/js/foundation.util.touch.js',
				      'bower_components/foundation-sites/js/foundation.util.triggers.js'
				],
				dest: 'js/foundation.js'
			}
	    },

		// grunt-bowercopy
		// https://www.npmjs.com/package/grunt-bowercopy
		bowercopy: {
			sass: {
				files : {
					'scss/':['foundation-sites/scss']
				}
			},
	        js: {
	        	files: {
	        		'js/': ['jquery/dist/jquery.min.js']
	        	}
	        } 
		},

		// grunt-sass
		// https://www.npmjs.com/package/grunt-sass
		sass: {
		    options: {
		       sourceMap: true
		    },
		    dev: {
		        options: {
		          outputStyle: 'nested'
		        },
		        files: {
		          'css/app.css': 'scss/app.scss',

		        }        
		    },
			deploy: {
				options: {
				  outputStyle: 'compressed'
				},
				files: {
				  'css/app.css': 'scss/app.scss'
				}        
			}
		},

		// grunt-autoprefixer
		// https://www.npmjs.com/package/grunt-autoprefixer
		// https://gist.github.com/jshawl/6225945
		autoprefixer: {
			options: {
				map: true,
			  browsers: ['last 2 versions', 'ie 8', 'ie 9']
			},
            dist: {
                files: {
                     'css/app.css': 'css/app.css',
                }
            }
        },

	    // grunt-contrib-uglify
		// https://www.npmjs.com/package/grunt-contrib-uglify
		uglify: {
		    options: {
			},
		    build: {
		    	files: [{
		        	expand: true,
		        	cwd: 'js',
		        	src: ['*.js', '!*.min.js', '!app.js'],
		        	dest: 'js' 
		        }]
		    },
			deploy: {
		       	files: [{
		            expand: true,
		            cwd: 'js',
		            src: ['*.js', '!*.min.js'],
		            dest: 'js' 
			    }]
		    }
		},

		// grunt-contrib-watch
		// https://www.npmjs.com/package/grunt-contrib-watch
		watch: {
			options: {
		   		livereload: true,
		   		spawn: true,
		  	},
		  	grunt: {
		  		files: ['Gruntfile.js'] 
		  	},
		  	sass: {
		    	files: 'scss/**/*.scss',
		    	tasks: ['sass:dev', 'autoprefixer']
		  	},
		  	files: [
		  		'*.{html,php}',
		  		'framework/*.php',
		  		'html/**/**/*.php',
		  		'img/{,**/}*.{png,jpg,jpeg,gif,webp,svg}',
		  		'js/*.js'
		  	]
		},

	});

	// Load Tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch')

	// Register Tasks
	grunt.registerTask( 'build', [
	 	'bowercopy',
	 	'concat:js',
	 	'uglify:build',
		'sass:dev',
		'autoprefixer'
	]);
	grunt.registerTask( 'default', [
		'watch'
	 ]);

}