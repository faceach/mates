'use strict';

angular.module('mates.photo', [])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('photo', {
            url: "/photo",
            views: {
                "menu": {
                    templateUrl: 'widgets/menu/home.tpl.html',
                    controller: 'MenuCtrl'
                },
                "content": {
                    templateUrl: 'widgets/photo/index.tpl.html',
                    controller: 'PhotoCtrl'
                }
            }
        });
    }
])

.controller('PhotoCtrl', [
    '$scope',
    '$http',
    '_',
    'msgBus',
    function($scope, $http, _, msgBus) {
        var photoId = "004";

        $scope.photo = {
            "src": "../test/" + photoId + ".jpg",
            "class": "",
            "graduationYear": "",
            "school": "",
            "schoolLevel": "",
            "summary": "",
            "faces": []
        };

        // Message event listner
        msgBus.onMsg('addPhoto', $scope, function($event, photo) {
            $scope.photo = _.extend($scope.photo, photo);
        });
    }
]);