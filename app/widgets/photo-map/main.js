'use strict';

angular.module('mates.photoReview', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('photo/review', {
        url: "/photo/review",
        views: {
            "menu": {
                templateUrl: 'widgets/menu/home.html',
                controller: 'MenuCtrl'
            },
            "content": {
                templateUrl: 'widgets/photo-map/index.html',
                controller: 'PhotoMapCtrl'
            }
        }
    });
}])

.controller('PhotoMapCtrl', [
    '$scope',
    '$http',
    '_',
    'msgBus',
    function($scope, $http, _, msgBus) {
        var photoId = "004";

        $scope.photo = {
            "src": "../test/" + photoId + ".jpg",
            "ratio": 0,
            "sizeInc": 10,
            "sizeEdge": 2
        };
        $scope.faces = [];
        $scope.faceActive = false;

        $http({
                method: 'GET',
                url: "./api/face_" + photoId + ".json"
            })
            .success(function(data, status, headers, config) {
                if (!data) {
                    return;
                }
                $scope.faces = data;
            })
            .error(function(data, status, headers, config) {});

        // Message event listner
        msgBus.onMsg('addPhoto', $scope, function($event, photo) {
            $scope.photo.src = photo.src;
        });

        $scope.toggleFaces = function($event) {
            if ($scope.faceActive) {
                _.each($scope.faces, function(face) {
                    face.active = false;
                    face.read = false;
                    face.edit = false;
                });
            } else {
                _.each($scope.faces, function(face) {
                    face.active = true;
                    face.read = false;
                    face.edit = false;
                });
            }
            $scope.faceActive = !$scope.faceActive;
        };
        $scope.active = function($event, face) {
            if (!face.active) {
                _.each($scope.faces, function(face) {
                    face.active = false;
                    face.read = false;
                    face.edit = false;
                });
                face.active = true;
                return;
            } else if (!face.read) {
                // Read mode
                face && (face.read = true);
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
