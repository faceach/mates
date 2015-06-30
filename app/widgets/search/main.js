'use strict';

angular.module('myApp.search', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('search', {
        url: "/search",
        views: {
            "menu": {
                templateUrl: 'widgets/menu/index.html',
                controller: 'MenuCtrl'
            },
            "content": {
                templateUrl: 'widgets/search/index.html',
                controller: 'SearchCtrl'
            }
        }
    });
}])

.controller('SearchCtrl', [
    '$scope',
    function($scope) {}
]);
