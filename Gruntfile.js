module.exports = function(grunt) {

    grunt.initConfig({
  
      cssmin: {
        target: {
          src: [
            'src/assets/css/font.css',
            'src/assets/fontawesome-free/css/all.min.css',
            'src/assets/css/sb-admin-2.min.css',
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
            preserveServerScript: true
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
    //   ,
    //   terser: {
    //     default_options: {
    //       options: {
    //       },
    //       files: {
    //         'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
    //       }
    //     },
    //     custom_options: {
    //       options: {
    //         separator: ': ',
    //         punctuation: ' !!!'
    //       },
    //       files: {
    //         'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
    //       }
    //     }
    //   }
      
    
          });
  
    // Default task
  //  grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('html',['htmlcompressor'])
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-terser');
    grunt.loadNpmTasks('grunt-htmlcompressor');

  
  };