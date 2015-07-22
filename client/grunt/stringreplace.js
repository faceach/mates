module.exports = function() {
  return {
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