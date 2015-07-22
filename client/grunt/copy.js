module.exports = function() {
  return {
    // Src --> Dist
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
    "dist-images": {
        files: [{
            expand: true,
            cwd: '<%= config.src %>img/',
            src: ['**/*.{png,jpg,gif}'],
            dest: '<%= config.dist %>img/'
        }]
    },
    "dist-bower": {
      files: [{
        expand: true,
        cwd: "<%= config.src %>bower_components/",
        src: ['**/*.js', '**/*.css', '**/*.js.map', '**/*.{eot,svg,ttf,woff}', '**/*.{png,jpg,gif}'],
        dest: '<%= config.dist %>bower_components/'
      }]
    },
    "dist-lib": {
      files: [{
        expand: true,
        cwd: "<%= config.src %>lib/",
        src: ['**/*.js', '**/*.css', '**/*.js.map', '**/*.{eot,svg,ttf,woff}', '**/*.{png,jpg,gif}'],
        dest: '<%= config.dist %>lib/'
      }]
    },
    "dist-api": {
        files: [{
            expand: true,
            cwd: '<%= config.src %>api/',
            src: ['**/*.json'],
            dest: '<%= config.dist %>api/'
        }]
    },
    // --------------------------------------
    // Dist --> Release
  }
};