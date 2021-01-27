module.exports = function(grunt) {

    grunt.initConfig({
  
      cssmin: {
        target: {
          src: [
            'src/assets/css/single-blog.css',
            'src/assets/css/blog.css'
            ],
          dest: 'src/assets/css/app.min.css'
      
    }
      },
      htmlcompressor: {
        compile: {
          files: {
            'dest/index.html': 'src/index.html'
          },
          options: {
            type: 'html',
            preserveServerScript: true,
            removeComments: true,
           collapseWhitespace: true
          }
        }
      },
      htmlmin: {                                     // Task
        dist: {                                      // Target
          options: {                                 // Target options
            removeComments: true,
            collapseWhitespace: true
          },
          files: {                                   // Dictionary of files
            'dist/index.html': 'dist/palmdale/browser/index.html'   // 'destination': 'source'
                    }
        }
      }
    //   cssmin: {
    // target: {
    //   files: [{
    //     expand: true,
    //     cwd: 'src/assets/css',
    //     src: ['*.css', '!*.min.css'],
    //     dest: 'src/assets/css',
    //     ext: '.min.css'
    //   }]
    // }
    //   }
      ,concat: {
        js: {
          src: 'src/jss/*.js',
          dest: 'dest/js/concat.js'
        },
        css: {
          src: ['src/assets/fontawesome-free/css/all.min.css',
          'src/assets/css/sb-admin-2.min.css'],
          dest: 'src/assets/css/app1.min.css'
        }
      },
      terser: {
        moduleJS: {
            files: [{
                expand: true,
                cwd: 'dist/palmdale/browser',
                src: ['main.*.js','polyfills.*.js'],
                dest: 'dist/palmdale/browser/modules/',
                rename: function (destBase, destPath) {
                  console.log(destBase);
                  console.log(destPath);
                    return destBase + destPath.replace('.js', '.min.js');
                }
            }]
        }
    }
      
    
          });
  
    // Default task
  //  grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('html',['htmlmin']);
    grunt.registerTask('terser',['terser']);
    grunt.registerTask('concat',['concat'])
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-terser');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');


  
  };