module.exports = function() {
  return {
    // Src --> Dist
    "dist-html": {
        files: [{
            expand: true,
            cwd: '<%= config.dist %>',
            src: ['*.cshtml'],
            dest: '<%= config.dist %>',
            ext: '.html'
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
    "release-html": {
        files: [{
            expand: true,
            cwd: '<%= config.dist %>',
            src: ['*.cshtml'],
            dest: '<%= config.release %>Views/Mates/'
        }]
    },
    "release-img": {
        files: [{
            expand: true,
            cwd: '<%= config.dist %>img/',
            src: ['**/*'],
            dest: '<%= config.release %>img/'
        }]
    },
    "release-bower": {
        files: [{
            expand: true,
            cwd: '<%= config.dist %>bower_components/',
            src: ['**/*'],
            dest: '<%= config.release %>bower_components'
        }]
    },
    "release-lib": {
        files: [{
            expand: true,
            cwd: '<%= config.dist %>lib/',
            src: ['**/*'],
            dest: '<%= config.release %>lib/'
        }]
    },
    "release-scripts": {
        files: [{
            expand: true,
            cwd: '<%= config.dist %>scripts/',
            src: ['**/*'],
            dest: '<%= config.release %>scripts/'
        }]
    },
    "release-styles": {
        files: [{
            expand: true,
            cwd: '<%= config.dist %>styles/',
            src: ['**/*'],
            dest: '<%= config.release %>styles/'
        }]
    }
  }
};