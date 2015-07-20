module.exports = function() {
	return {
		"options": {
			/*livereload: true,*/
		},
		"views": {
			files: ['<%= config.src %>views/**/*.html', '<%= config.src %>viewsmobile/**/*.html'],
			tasks: ['view']
		},
		"images": {
			files: ['<%= config.src %>images/**/*.{png,jpg,gif}', '<%= config.src %>styles/bg/**/*.{png,jpg,gif}'],
			tasks: ['imagemin:dist-images', 'copy:release-images']
		}
	}
};