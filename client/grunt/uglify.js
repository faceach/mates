module.exports = function() {
    return {
        development: {
            options: {
                mangle: true,
                compress: true,
                beautify: true
                /*Sitemap*/
            },
            files: {
                '<%= config.dist %>scripts/app.js': [
                    '<%= config.temp %>app.js',
                    '<%= config.src %>widgets/utils/utils.js',
                    '<%= config.src %>widgets/utils/msgbus.js',
                    '<%= config.src %>widgets/utils/underscore.js',
                    '<%= config.src %>widgets/utils/url.js',
                    '<%= config.src %>widgets/weixin/main.js',
                    '<%= config.src %>widgets/menu/main.js',
                    '<%= config.src %>widgets/search/main.js',
                    '<%= config.src %>widgets/account/main.js',
                    '<%= config.src %>widgets/photo/main.js',
                    '<%= config.src %>widgets/photo/add/main.js',
                    '<%= config.src %>widgets/photo/map/main.js',
                    '<%= config.src %>widgets/photo/people/main.js',
                    '<%= config.src %>widgets/photo/fullscreen/main.js',
                    '<%= config.src %>components/version/version.js',
                    '<%= config.src %>components/version/version-directive.js',
                    '<%= config.src %>components/version/interpolate-filter.js',
                ]
            }
        },
        production: {
            options: {
                mangle: true,
                compress: true,
                beautify: false
                /*Sitemap*/
            },
            files: {
                '<%= config.dist %>scripts/app.min.js': [
                    '<%= config.dist %>scripts/app.js',
                ]
            }
        }
    };
};