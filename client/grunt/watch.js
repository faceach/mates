module.exports = function() {
	return {
		"options": {
			/*livereload: true,*/
		},
		"views": {
			files: ['<%= config.src %>**/*.html'],
			tasks: ['view']
		}
	}
};