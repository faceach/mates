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
    '$state',
    '$stateParams',
    '_',
    'photoPeopleModal',
    'msgBus',
    function($scope, $http, $state, $stateParams, _, photoPeopleModal, msgBus) {

        var photoId = $stateParams.photoId;
        if (!photoId) {
            // Default photo
            $state.go("photo", {
                photoId: "860b9ca135f443aeb1f582f6f83cd3c8"
            });
            return;
        }

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

                _.each(data.FaceWithPersonList, function(e, keye) {
                    e.FaceModel.people = e.PersonModel;
                });

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
            $scope.photo.people = [];
            $scope.photo = _.extend($scope.photo, photo);
        });
        msgBus.onMsg('addPeople', $scope, function($event, people) {
            _.each($scope.photo.people, function(e, keye) {
                if (e.FaceModel.FaceId === people.FaceId) {
                    e.PersonModel = _.extend(e.PersonModel, people);
                }
            });
        });

        //
        $scope.readPeopleInfo = function($event, face) {
            photoPeopleModal.show(face);
        };
    }
]);
