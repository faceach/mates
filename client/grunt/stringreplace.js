var crypto = require('crypto');

module.exports = function() {
  return {
    "html-debug": {
      files: [{
        expand: true,
        cwd: '<%= config.src %>',
        src: ['*.cshtml'],
        dest: '<%= config.dist %>'
      }],
      options: {
        replacements: [{
          pattern: /#v#/ig,
          replacement: "v=" + crypto.randomBytes(20).toString('hex')
        }]
      }
    },
    "html": {
      files: [{
        expand: true,
        cwd: '<%= config.src %>',
        src: ['*.cshtml'],
        dest: '<%= config.dist %>'
      }],
      options: {
        replacements: [{
          pattern: /#v#/ig,
          replacement: "v=<%= pkg.version %>"
        }, {
          pattern: /app.js/ig,
          replacement: "app.min.js"
        }]
      }
    },
    "js": {
      files: {
        "<%= config.temp %>app.js": "<%= config.src %>app.js"
      },
      options: {
        replacements: [{
          pattern: "/*'templates-main'*/",
          replacement: "'templates-main'"
        }]
      }
    }
  }
};