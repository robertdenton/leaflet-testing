module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Set up env
    env: {
      dev: {
        NODE_ENV: 'DEV'
      },
      prod: {
        NODE_ENV: 'PRO'
      }
    },

    // So sassy...
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dev/css/styles.css': 'dev/css/sass/main.scss'
        }
      }
    },

    // Concat build files
    concat: {
      js: {
        src: 'dev/js/scripts/*.js',
        dest: 'dev/js/scripts.js'
      }
    },

    // JSHint
    jshint: {
      dev: ['dev/js/scripts/cards.js','dev/js/scripts/map.js']
      //prod: 'dist/js/scripts.min.js'
    },

    // Preprocess HTML
    preprocess: {
      dev: {
        src: 'dev/html/index.html',
        dest: 'dev/index.html'
      },
      prod: {
        src: 'dev/index.html',
        dest: 'dist/index.html'
      }
    },

    // Minify css
    cssmin: {
      target:{
        files: {
          'dist/css/styles.min.css': 'dev/css/styles.css'
        }
      }
    },

    // Uglify JS
    uglify: {
      build: {
        src: 'dev/js/scripts.js',
        dest: 'dist/js/scripts.min.js'
      }
    },

    // Watch it...
    watch: {
      scripts: {
        files: 'dev/*/*/*',
        tasks: ['env:dev','sass','concat','preprocess:dev']
      }
    }

  });

  //
  // Load packages
  // Sass
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // JS
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // HTML
  grunt.loadNpmTasks('grunt-preprocess');
  // Other
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');

  //
  // Set up tasks
  grunt.registerTask('default', [] );
  grunt.registerTask('dev', ['env:dev','jshint:dev','sass','concat','preprocess:dev'] );
  grunt.registerTask('prod', ['env:prod','sass','concat','preprocess:prod','cssmin','uglify'] );

};
