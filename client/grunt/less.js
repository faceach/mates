module.exports = function() {
    return {
        development: {
            options: {
                paths: []
            },
            files: {
                "<%= config.temp %>styles/base/boot.css": "<%= config.src %>styles/base/boot.less",
                "<%= config.temp %>styles/page/main.css": "<%= config.src %>styles/page/main.less",
                // Mobile
                "<%= config.temp %>styles/mobile/main.css": "<%= config.src %>styles/mobile/main.less",
                // Wechat
                "<%= config.temp %>styles/wechat/main.css": "<%= config.src %>styles/wechat/main.less",
                // Paws
                "<%= config.temp %>styles/paws/main.css": "<%= config.src %>styles/paws/main.less",
                // Warming Day
                "<%= config.temp %>styles/event/warmingday.css": "<%= config.src %>styles/event/warmingday.less",
                "<%= config.temp %>styles/event/warmingday-mobile.css": "<%= config.src %>styles/event/warmingday-mobile.less",
                // Valentine Day
                "<%= config.temp %>styles/event/valentine.css": "<%= config.src %>styles/event/valentine.less",
                // Womens Day
                "<%= config.temp %>styles/event/womensday.css": "<%= config.src %>styles/event/womensday.less",
                // Workshop
                "<%= config.temp %>styles/event/workshop.css": "<%= config.src %>styles/event/workshop.less",
                // Juicemonday
                "<%= config.temp %>styles/event/juicemonday.css": "<%= config.src %>styles/event/juicemonday.less"
            }
        },
        production: {
            options: {
                paths: [],
                compress: true
            },
            files: {
                "<%= config.temp %>styles/base/boot.min.css": "<%= config.temp %>styles/base/boot.css",
                "<%= config.temp %>styles/page/main.min.css": "<%= config.temp %>styles/page/main.css",
                // Mobile
                "<%= config.temp %>styles/mobile/main.min.css": "<%= config.temp %>styles/mobile/main.css",
                // Wechat
                "<%= config.temp %>styles/wechat/main.min.css": "<%= config.temp %>styles/wechat/main.css",
                // Paws
                "<%= config.temp %>styles/paws/main.min.css": "<%= config.temp %>styles/paws/main.css",
                // Warming Day
                "<%= config.temp %>styles/event/warmingday.min.css": "<%= config.temp %>styles/event/warmingday.css",
                "<%= config.temp %>styles/event/warmingday-mobile.min.css": "<%= config.temp %>styles/event/warmingday-mobile.css",
                // Valentine Day
                "<%= config.temp %>styles/event/valentine.min.css": "<%= config.temp %>styles/event/valentine.css",
                // Womens Day
                "<%= config.temp %>styles/event/womensday.min.css": "<%= config.temp %>styles/event/womensday.css",
                // Workshop
                "<%= config.temp %>styles/event/workshop.min.css": "<%= config.temp %>styles/event/workshop.css",
                // Juicemonday
                "<%= config.temp %>styles/event/juicemonday.min.css": "<%= config.temp %>styles/event/juicemonday.css"
            }
        }
    };
};