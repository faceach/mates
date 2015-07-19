'use strict';

angular.module('mates.account', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('account', {
        url: "/account",
        views: {
            "menu": {
                templateUrl: 'widgets/menu/non-home.html',
                controller: 'MenuCtrl'
            },
            "content": {
                templateUrl: 'widgets/account/index.html',
                controller: 'AccountCtrl'
            }
        }
    });
}])

.controller('AccountCtrl', [
    '$scope',
    function($scope) {}
]);
