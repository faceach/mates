module.exports = function() {
	return {
		"options": {
			/*livereload: true,*/
		},
		"views": {
			files: [
				'<%= config.src %>index.cshtml',
				'<%= config.src %>app.js',
				'<%= config.src %>styles/**/*.less',
				'<%= config.src %>widgets/**/*.js',
				'<%= config.src %>widgets/**/*.tpl.html',
			],
			tasks: ['develop']
		}
	}
};