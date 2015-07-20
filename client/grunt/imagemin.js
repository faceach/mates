module.exports = function() {
    return {
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
        }
    }
};