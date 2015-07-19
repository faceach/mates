angular.module('ng.utils')
    .factory('url', function() {

        function getSearchFromURL(url) {
            var searchStart = url.indexOf("?");
            var hashStart = url.indexOf("#");
            var searchEnd = hashStart > searchStart ? hashStart : url.length;

            return url.substring(searchStart, searchEnd);
        }

        return {
            "getQuery": function(url) {
                var search;
                if (!url) {
                    // Get current page location
                    search = location.search;
                } else {
                    // Parse given URL
                    search = getSearchFromURL(url);
                }

                var theRequest = {};
                if (search.indexOf("?") !== -1) {
                    var str = search.substr(1);
                    var strs = str.split("&");
                    for (var i = 0, l = strs.length; i < l; i++) {
                        theRequest[(strs[i].split("=")[0]).toLowerCase()] = unescape(strs[i].split("=")[1]);
                    }
                }
                return theRequest;
            }
        }
    });
