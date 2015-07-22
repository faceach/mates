module.exports = function() {
    return {
        "dist-img": {
            files: [{
                expand: true,
                cwd: '<%= config.src %>img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: '<%= config.dist %>img/'
            }]
        }
    }
};