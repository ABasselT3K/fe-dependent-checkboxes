'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        www: 'www',
        bower: 'www/bower',
        styles: 'www/less',
        css: 'www/css',
        js: 'www/js',
        test: 'www/test',

        jshint: {
            options: {
                reporter: require('jshint-stylish'),

                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                freeze: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                indent: 4,
                white: false,
                quotmark: 'single',
                trailing: true,
                jquery: true,
                browser: true,
                esnext: true,
                debug: false,
                devel: false,
                predef: [
                    'require',
                    'module'
                ]
            },
            gruntfile: {
                options: {
                    node: true
                },
                src: 'Gruntfile.js'
            },
            dev: {
                options: {
                    devel: true,
                    debug: true,
                    unused: false
                },
                src: [
                    '<%= js %>/*.js'
                ]
            },
            production: {
                src: [
                    '<%= js %>/*.js'
                ]
            }
        },

        jscs: {
            options: {
                config: '.jscsrc',
                esnext: true
            },
            src: [
                '<%= js %>/*.js'
            ]
        },

        mocha: {
            test: {
                options: {
                    //reporter: 'spec',
                    run: true
                },
                src: ['<%= test %>/*.html']
            },
        },

        esteWatch: {
            options: {
                dirs: [
                    '<%= js %>/',
                    '<%= test %>/**/'
                ],
                livereload: {
                    enabled: false
                }
            },
            html: 'jsdev',
            js: 'jsdev'
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            js: {
                files: [
                    '<%= js %>/*.js',
                    '<%= test %>/*.js'
                ],
                tasks: ['jshint:dev', 'test']
            },
            html: {
                files: [
                    '<%= www %>/*.html',
                    '<%= test %>/*.html'
                ],
                tasks: ['test']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '<%= css %>/style.css',
                        '<%= js %>/*.js',
                        '<%= www %>/*.html',
                        '<%= test %>/*.html',
                    ]
                },
                options: {
                    watchTask: true,
                    port: 7979,
                    open: false,
                    server: {
                        baseDir: '<%= www %>'
                    }
                }
            }
        }
    });

    require('jit-grunt')(grunt);

    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('jsdev', ['jshint:gruntfile', 'jshint:dev', 'test']);
    grunt.registerTask('js', ['jshint:gruntfile', 'jshint:production', 'jscs', 'test']);
    grunt.registerTask('test', ['mocha']);
    grunt.registerTask('build', ['js', 'test']);

};
