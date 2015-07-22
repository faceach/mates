'use strict';

angular.module('mates.search', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('search', {
        url: "/search",
        views: {
            "menu": {
                templateUrl: 'widgets/menu/non-home.tpl.html',
                controller: 'MenuCtrl'
            },
            "content": {
                templateUrl: 'widgets/search/index.tpl.html',
                controller: 'SearchCtrl'
            }
        }
    });
}])

.controller('SearchCtrl', [
    '$scope',
    function($scope) {}
]);
