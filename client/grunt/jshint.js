module.exports = function() {
	return {
		scripts: ['<%= config.src %>/scripts/page/**/*.js',
			'<%= config.src %>/scripts/widget/**/*.js'
		],
		options: {
			ignores: [
			]
		}
	}
};