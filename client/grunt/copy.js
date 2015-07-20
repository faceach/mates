module.exports = function() {
  return {
    // Src --> Dist || Images, instead of grunt-contrib-imagemin
    "dist-images": {
        files: [{
            expand: true,
            cwd: '<%= config.src %>images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: '<%= config.dist %>images/'
        }]
    },
    "dist-bgs": {
        files: [{
            expand: true,
            cwd: '<%= config.src %>styles/bg/',
            src: ['**/*.{png,jpg,gif}'],
            dest: '<%= config.dist %>styles/bg/'
        }]
    },
    // Src --> Dist
    "dist-scripts": {
      files: [{
        expand: true,
        cwd: "<%= config.src %>scripts/",
        src: ['_shared/**', 'skin/**', 'page/share.js', 'paws/**'],
        dest: '<%= config.dist %>scripts/'
      }]
    },
    "dist-styles": {
      files: [{
        expand: true,
        cwd: "<%= config.src %>styles/",
        src: ['fonts/**', 'bootstrap/**'],
        dest: '<%= config.dist %>styles/'
      }]
    },
    "dist-download": {
      files: [{
        expand: true,
        cwd: "<%= config.src %>download/",
        src: ['**'],
        dest: '<%= config.dist %>download/'
      }]
    },
    // --------------------------------------
    // Dist --> Release
    "release-images": {
      files: [{
        expand: true,
        cwd: "<%= config.dist %>images/",
        src: ['**'],
        dest: "<%= config.release %>images/"
      }]
    },
    "release-styles": {
      files: [{
        expand: true,
        cwd: "<%= config.dist %>styles/",
        src: ['fonts/**', 'bootstrap/**'],
        dest: '<%= config.release %>styles/'
      }]
    },
    "release-styles-version": {
      files: [{
        expand: true,
        cwd: "<%= config.dist %>styles/",
        src: ["bg/**", "base/**", "page/**", "mobile/**", "wechat/**", "event/**", "paws/**"],
        dest: "<%= config.release %>styles/<%= pkg.version %>/"
      }]
    },
    "release-scripts": {
      files: [{
        expand: true,
        cwd: "<%= config.dist %>scripts/",
        src: ["_shared/**", "skin/**"],
        dest: "<%= config.release %>scripts/"
      }]
    },
    "release-scripts-version": {
      files: [{
        expand: true,
        cwd: "<%= config.dist %>scripts/",
        src: ["page/**", "widget/**", "paws/**"],
        dest: "<%= config.release %>scripts/<%= pkg.version %>/"
      }]
    },
    "release-html": {
      files: [{
        expand: true,
        cwd: "<%= config.dist %>views/",
        src: ["**/*.cshtml"],
        dest: "<%= config.release %>Views/"
      }]
    },
    "release-html-mobile": {
      files: [{
        expand: true,
        cwd: "<%= config.dist %>viewsmobile/",
        src: ["**/*.cshtml"],
        dest: "<%= config.release %>Areas/Mobile/Views/"
      }]
    },
    "release-download": {
      files: [{
        expand: true,
        cwd: "<%= config.dist %>download/",
        src: ["**"],
        dest: "<%= config.release %>download/"
      }]
    }
  }
};