module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    less : {
        dev : {
            files :  {
                '.tmp/styles/main.css' : 'app/styles/main.less'
            }
        },
    },

    autoprefixer : {
        dev : {
            files :  {
                '.tmp/styles/main.css' : '.tmp/styles/main.css'
            }
        }
    },

    watch : {
        less : {
            files : ['app/styles/*.less'],
            tasks : ['css']
        },
        livereload : {
            files : ['.tmp/styles/main.css', 'app/index.html'],
            options : {
                livereload : true,
            },
        }
    },

    connect : {
        server : {
            options : {
                base : ['app' ,'.tmp'],
                livereload : true,
                open : true, 
                hostname : 'localhost'
            },
        },
    },

    clean : {
        dev : ['.tmp']
    },
    
    cssmin : {
        my_target : {
            files : [{
                expand : true,
                cwd : '.tmp/styles/',
                src: ['*.css', '!*.min.css'],
                dest : '.tmp/styles/',
                ext : '.min.css'
            }]
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('server' , ['css','connect', 'watch']);
  grunt.registerTask('css' , ['less', 'autoprefixer','cssmin']);


  // Default task(s).
  grunt.registerTask('default', []);
};
