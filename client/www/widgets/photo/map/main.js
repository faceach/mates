'use strict';

angular.module('mates.photo.map', [])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('photo/review', {
            url: "/photo/review/:photoId",
            views: {
                "menu": {
                    templateUrl: 'widgets/menu/home.tpl.html',
                    controller: 'MenuCtrl'
                },
                "content": {
                    templateUrl: 'widgets/photo/map/index.tpl.html',
                    controller: 'PhotoMapCtrl'
                }
            }
        });
    }
])

.controller('PhotoMapCtrl', [
    '$scope',
    '$http',
    '$location',
    '$state',
    '$stateParams',
    '_',
    'msgBus',
    'photoPeopleModal',
    'photoFullscreenModal',
    function($scope, $http, $location, $state, $stateParams, _, msgBus, photoPeopleModal, photoFullscreenModal) {
        var photoId = $stateParams.photoId;
        if (!photoId) {
            // Default photo
            $state.go("photo/review", {
                photoId: "860b9ca135f443aeb1f582f6f83cd3c8"
            });
            return;
        }

        $scope.photo = {
            "photoId": photoId,
            "src": "",
            "ratio": 0,
            "sizeInc": 10,
            "sizeEdge": 2,
            "faces": [],
        };
        $scope.faceActive = false;

        $http.get("api/photo/persons?photoId=" + photoId)
            .success(function(data, status, headers, config) {
                if (!data || !data.PhotoEntity) {
                    return;
                }
                var dataPhoto = data.PhotoEntity;

                _.each(data.FaceList, function(e, keye) {
                    e.people = {};
                    _.each(data.FaceWithPersonList, function(f, keyf) {
                        if (e.FaceId === f.FaceModel.FaceId) {
                            e.recognized = true;
                            e.people = f.PersonModel;
                        }
                    });
                });

                $scope.photo = _.extend($scope.photo, {
                    "src": dataPhoto.URL,
                    "faces": data.FaceList
                });
            })
            .error(function(data, status, headers, config) {});

        // Message event listner
        msgBus.onMsg('addPhoto', $scope, function($event, photo) {
            $scope.photo.photoId = photo.PhotoId;
            $scope.photo.src = photo.src;
            $scope.photo.faces = photo.faces;
        });
        msgBus.onMsg('addPeople', $scope, function($event, people) {
            _.each($scope.photo.faces, function(e, keye) {
                if (e.FaceId === people.FaceId) {
                    e.people = _.extend(e.people, people);
                }
            });
        });
        msgBus.onMsg('cancelEditPeople', $scope, function($event) {
            var face = _.find($scope.photo.faces, function(face) {
                return face.read || face.edit;
            });
            if (face) {
                face.read = false;
                face.edit = false;
            }
        });

        $scope.landscape = function($event) {
            photoFullscreenModal.show($scope.photo.src);
        };

        $scope.toggleFaces = function($event) {
            if ($scope.faceActive) {
                _.each($scope.photo.faces, function(face) {
                    face.active = false;
                    face.read = false;
                    face.edit = false;
                });
            } else {
                _.each($scope.photo.faces, function(face) {
                    face.active = true;
                    face.read = false;
                    face.edit = false;
                });
            }
            $scope.faceActive = !$scope.faceActive;
        };
        $scope.active = function($event, face) {
            if (!face.active) {
                _.each($scope.photo.faces, function(face) {
                    face.active = false;
                    face.read = false;
                    face.edit = false;
                });
                face.active = true;
                return;
            } else if (!face.read) {
                if (confirm("这是你本人吗？或者你希望编辑该同学的资料？")) {
                    // Read mode
                    face && (face.read = true);
                    photoPeopleModal.show(face);
                }

                return;
            }
        };

        $scope.edit = function($event, face) {
            face && (face.edit = true);
        };
    }
])

.directive('photoMap',
    function() {
        return {
            restrict: 'A',
            scope: {
                ratio: '='
            },
            link: function($scope, $element, $attr) {
                var previewContainerWidth = $element[0].offsetWidth;
                var previewContainerHeight = $element[0].offsetHeight;

                var previewCentrePointX = Math.floor(previewContainerWidth / 2);
                var previewCentrePointY = Math.floor(previewContainerHeight / 2);

                var _elMap = $element.children()[0];
                var _elImg = $element.find("img")[0];

                _elImg.onload = function(evt) {
                    var mapWidth = _elMap.offsetWidth;
                    var mapHeight = _elMap.offsetHeight;

                    var imgWidth = _elImg.naturalWidth;
                    var imgHeight = _elImg.naturalHeight;

                    $scope.ratio = (mapHeight / imgHeight).toFixed(3);
                    $scope.$apply();
                }
            }
        };
    });
