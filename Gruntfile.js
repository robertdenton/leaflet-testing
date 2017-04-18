module.exports = function(grunt) {

  // Other
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Sass
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // JS
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // HTML
  grunt.loadNpmTasks('grunt-preprocess');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Set up env
    env: {
      dev: {
        NODE_ENV: 'DEVELOPMENT'
      },
      prod: {
        NODE_ENV: 'PRODUCTION'
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
        tasks: ['sass','concat','preprocess']
      }
    }

  });

  grunt.registerTask('dev', ['env:dev','sass','concat','preprocess:dev'] );
  grunt.registerTask('default', ['env:prod','sass','concat','preprocess:prod','cssmin','uglify'] );

};
