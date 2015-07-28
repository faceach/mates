'use strict';

angular.module('mates.photo', [])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('photo', {
            url: "/photo/:photoId",
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
    '$stateParams',
    '_',
    'msgBus',
    function($scope, $http, $stateParams, _, msgBus) {

        var photoId = $stateParams.photoId;
        $scope.photo = {
            "photoId": photoId,
            "src": "",
            "class": "",
            "graduationYear": "",
            "school": "",
            "schoolLevel": "",
            "summary": "",
            "people": []
        };

        $http.get("api/photo/persons?photoId=" + photoId)
            .success(function(data, status, headers, config) {
                if (!data || !data.PhotoEntity) {
                    return;
                }
                var dataPhoto = data.PhotoEntity;
                $scope.photo = _.extend($scope.photo, {
                    "src": dataPhoto.URL,
                    "class": dataPhoto.GradeClass,
                    "graduationYear": dataPhoto.GraduateDate,
                    "school": dataPhoto.School,
                    "schoolLevel": dataPhoto.SchoolLevel,
                    "summary": dataPhoto.Summary,
                    "people": data.FaceWithPersonList
                });
            })
            .error(function(data, status, headers, config) {});

        // Message event listner
        msgBus.onMsg('addPhoto', $scope, function($event, photo) {
            $scope.photo = _.extend($scope.photo, photo);
        });
    }
]);