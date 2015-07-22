module.exports = function() {
  return {
    "dist-cshtml": {
        files: [{
            expand: true,
            cwd: '<%= config.src %>',
            src: ['*.cshtml'],
            dest: '<%= config.dist %>'
        }]
    },
    "dist-html": {
        files: [{
            expand: true,
            cwd: '<%= config.dist %>',
            src: ['*.cshtml'],
            dest: '<%= config.dist %>',
            ext: '.html'
        }]
    },
    // Src --> Dist || Images, instead of grunt-contrib-imagemin
    "dist-images": {
        files: [{
            expand: true,
            cwd: '<%= config.src %>img/',
            src: ['**/*.{png,jpg,gif}'],
            dest: '<%= config.dist %>img/'
        }]
    },
    // Src --> Dist
    "dist-bower": {
      files: [{
        expand: true,
        cwd: "<%= config.src %>bower_components/",
        src: ['**/*.js', '**/*.css', '**/*.js.map'],
        dest: '<%= config.dist %>bower_components/'
      }]
    },
    "dist-lib": {
      files: [{
        expand: true,
        cwd: "<%= config.src %>lib/",
        src: ['**/*.js', '**/*.css', '**/*.js.map'],
        dest: '<%= config.dist %>lib/'
      }]
    }
    // --------------------------------------
    // Dist --> Release
  }
};