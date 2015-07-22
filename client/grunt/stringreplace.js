module.exports = function() {
  return {
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