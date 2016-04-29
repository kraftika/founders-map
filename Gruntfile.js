'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn'
  });

  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    founders: appConfig,

    pkg: grunt.file.readJSON('package.json'),

    cdnify: {
      dist: {
        html: ['<%= founders.dist %>/*.html']
      }
    },

    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: [
          '<%= founders.app %>/*.js'
        ],
        dest: '<%= founders.dist %>/js/main.min.js'
      },
    },

    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          '<%= founders.dist %>/js/main.min.js': ['<%= founders.dist %>/js/main.min.js']
        }
      }
    },
    less: {
      style: {
        files: {
          '<%= founders.dist %>/css/style.css': 'less/style.less'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'app/**/*.js',
          'test/**/*.js'
        ]
      }
    },

    watch: {
      files: [
        'Gruntfile.js',
        'app/**',
        'bower.json'
        ],
      tasks: ['jshint'],
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= founders.app %>/app/{,*/}*.js',
          '<%= founders.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= founders.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
    },

    connect: {
      options: {
        hostname: 'localhost',
        port: 9000,
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('build', [
    'jshint',
    'concat',
    'uglify',
    'cdnify',
    'watch'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'connect:livereload',
    'watch',
  ]);
};
