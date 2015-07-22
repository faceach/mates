module.exports = function() {
    return {
      "dist": ["<%= config.dist %>"],
      "release": [
        "<%= config.release %>bower_components/",
        "<%= config.release %>lib/",
        "<%= config.release %>img/",
        "<%= config.release %>scripts/",
        "<%= config.release %>styles/",
        "<%= config.release %>Views/Mates/"
      ]
    }
};