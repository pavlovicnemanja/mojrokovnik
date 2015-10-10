module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: 'app/styles', 
                    yuicompress: true
                },
                files: {
                    'app/styles/style.css': 'app/**/*.less'
                }
            }
        },
        watch: {
            less: {
                files: 'app/**/*.less',
                tasks: 'less'
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
    
    grunt.registerTask('start', ['http-server:dev', 'watch']);

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');
};
