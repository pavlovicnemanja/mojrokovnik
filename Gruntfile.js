module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    paths: 'app/styles',
                    yuicompress: true
                },
                files: {
                    'app/styles/style.css': ['app/**/*.less', '!app/scripts/bower_components/**/*.less']
                }
            }
        },

        cssmin: {
            target: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'app/styles/app.min.map',
                    report: 'gzip'
                },
                files: {
                    'app/styles/app.min.css': ['app/**/*.css', '!app/scripts/bower_components/**/*.css']
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            target: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'app/scripts/app.min.map'
                },
                files: {
                    'app/scripts/app.min.js': ['app/**/*.js', '!app/scripts/bower_components/**/*.js']
                }
            }
        },

        watch: {
            less: {
                files: 'app/**/*.less',
                tasks: 'less'
            },
            css: {
                files: ['app/**/*.css', '!app/styles/app.min.css'],
                tasks: 'cssmin'
            },
            js: {
                files: ['app/**/*.js', '!app/scripts/app.min.js'],
                tasks: 'uglify'
            }
        },

        'http-server': {
            'dev': {
                root: 'app',
                port: 8000,
                host: 'localhost',
                runInBackground: true
            }
        }
    });

    grunt.registerTask('develop', ['watch']);
    grunt.registerTask('start', ['http-server:dev', 'watch']);

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');
};
