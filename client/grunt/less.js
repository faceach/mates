module.exports = function() {
    return {
        development: {
            options: {
                paths: []
            },
            files: {
                "<%= config.dist %>styles/app.css": "<%= config.src %>styles/app.less",
            }
        },
        production: {
            options: {
                paths: [],
                compress: true
            },
            files: {
                "<%= config.dist %>styles/app.min.css": "<%= config.dist %>styles/app.css",
            }
        }
    };
};