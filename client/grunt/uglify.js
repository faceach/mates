module.exports = function() {
    return {
        options: {
            mangle: true,
            compress: true,
            beautify: false
            /*Sitemap*/
        },
        dist: {
            files: {
                '<%= config.dist %>scripts/page/boot.min.js': ['<%= config.dist %>scripts/page/boot.js'],
                '<%= config.dist %>scripts/page/share.min.js': ['<%= config.dist %>scripts/page/share.js'],

                '<%= config.dist %>scripts/widget/site.min.js': ['<%= config.dist %>scripts/widget/site.js'],
                '<%= config.dist %>scripts/widget/msite.min.js': ['<%= config.dist %>scripts/widget/msite.js'],

                '<%= config.dist %>scripts/skin/main.min.js': ['<%= config.dist %>scripts/skin/main.js']
            }
        }
    }
};