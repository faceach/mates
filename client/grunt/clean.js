module.exports = function() {
    return {
      "dist": ["<%= config.dist %>"],
      "release": [
        "<%= config.release %>images/",
        "<%= config.release %>styles/",
        "<%= config.release %>scripts/",

        "<%= config.release %>Views/Mates/"
      ]
    }
};