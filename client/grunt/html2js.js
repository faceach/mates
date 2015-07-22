module.exports = function() {
  return {
    options: {
      // custom options, see below 
      'base': 'client/www'
    },
    main: {
      src: ['<%= config.src %>widgets/**/*.tpl.html'],
      dest: '<%= config.dist %>scripts/templates.js'
    },
  }
};