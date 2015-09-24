'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        www: 'www',
        bower: 'www/bower',
        styles: 'www/less',
        css: 'www/css',
        js: 'www/js',
        app: 'www/app',
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
                    '<%= app %>/dependent-checkboxes-es2015.js'
                ]
            },
            production: {
                src: [
                    '<%= app %>/dependent-checkboxes-es2015.js',
                ]
            }
        },

        jscs: {
            options: {
                config: '.jscsrc',
                esnext: true
            },
            src: [
                '<%= app %>/dependent-checkboxes-es2015.js'
            ]
        },

        /*babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    '<%= js %>/dependent-checkboxes-es2015.js': '<%= app %>/dependent-checkboxes-es2015.js'
                }
            }
        },*/

        browserify: {
            build: {
                options: {
                    debug: true,
                    sourceMap: true,
                    transform: [ ['babelify'] ]
                },
                files: {
                    '<%= js %>/dependent-checkboxes-es2015.js': '<%= app %>/dependent-checkboxes-es2015.js'
                }
            }/*,
            react: {
                options: {
                    debug: true,
                    transform: [ ['babelify'] ]
                },
                files: {
                    '<%= js %>/dependent-checkboxes-react.js': '<%= app %>/dependent-checkboxes-react.jsx'
                }
            }*/
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

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            jshint: {
                files: [
                    '<%= js %>/dependent-checkboxes.js',
                    '<%= js %>/dependent-checkboxes-vanilla.js'
                ],
                tasks: ['jshint:dev']
            },
            browserify: {
                files: [
                    '<%= app %>/*.js'
                ],
                tasks: ['browserify:build']
            },
            react: {
                files: [
                    '<%= app %>/*.jsx'
                ],
                tasks: ['browserify:react']
            },
            jstest: {
                files: [
                    '<%= test %>/*.js'
                ],
                tasks: ['test']
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

    grunt.registerTask('default', ['browserify', 'browserSync', 'watch']);
    grunt.registerTask('jsdev', ['jshint:gruntfile', 'jshint:dev', 'browserify', 'test']);
    grunt.registerTask('js', ['jshint:gruntfile', 'jshint:production', 'jscs', 'browserify', 'test']);
    grunt.registerTask('test', ['mocha']);
    grunt.registerTask('build', ['js']);

};
