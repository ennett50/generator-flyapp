// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // configurable paths
        yeoman: {
            app: 'app'
        },
        watch: 

            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= yeoman.app %>/*.html',
                    '<%%= yeoman.app %>/css/{,*/}*.css',
                    '{<%%= yeoman.app %>}/js/{,*/}*.js',
                    '<%%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%%= yeoman.app %>',
                        '<%%= yeoman.app %>/css'
                    ]
                }
            }
        }
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/css/',
                    src: '{,*/}*.css',
                    dest: '<%%= yeoman.app %>/css/'
                }]
            }
        },
        svgmin: {
            files: [{
                expand: true,
                cwd: '<%%= yeoman.app %>/img',
                src: '{,*/}*.svg',
                dest: '<%%= yeoman.app %>/img'
            }]
        },
        modernizr: {
            devFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
            // extra : {
            //     "shiv" : true,
            //     "printshiv" : false,
            //     "load" : true,
            //     "mq" : false,
            //     "cssclasses" : true
            // },
            files: [
                '<%%= yeoman.app %>/js/{,*/}*.js',
                '<%%= yeoman.app %>/css/{,*/}*.css',
                '!<%%= yeoman.app %>/js/vendor/*'
            ],
            uglify: true
        }
    });

    grunt.registerTask('server', function (target) {
        grunt.task.run(
            'autoprefixer:server',
            'connect:livereload',
            'watch'
        ]);
    });
};
