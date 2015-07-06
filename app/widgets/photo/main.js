'use strict';

angular.module('mates.photo', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('photo', {
        url: "/photo",
        views: {
            "menu": {
                templateUrl: 'widgets/menu/home.html',
                controller: 'MenuCtrl'
            },
            "content": {
                templateUrl: 'widgets/photo/index.html',
                controller: 'PhotoCtrl'
            }
        }
    });
}])

.controller('PhotoCtrl', [
    '$scope',
    '$http',
    '_',
    'msgBus',
    function($scope, $http, _, msgBus) {
        var photoId = "004";

        $scope.photo = {
            "src": "../test/" + photoId + ".jpg"
        };
        $scope.ratio = {
            "x": 0.5,
            "y": 0.5
        };
        $scope.focusPosition = {
            "left": "50%",
            "top": "50%"
        };
        $scope.faces = [];

        $http({
                method: 'GET',
                url: "./api/face_" + photoId + ".json"
            })
            .success(function(data, status, headers, config) {
                if (!data) {
                    return;
                }
                $scope.faces = data.faces;
            })
            .error(function(data, status, headers, config) {});

        // Message event listner
        msgBus.onMsg('addPhoto', $scope, function($event, photo) {
            $scope.photo.src = photo.src;
        });

        $scope.preview = function($event) {

            var elPad = $event.element[0];
            var effectualTarget = elPad.firstElementChild;
            var effectualPosition = {
                "left": effectualTarget.offsetLeft,
                "top": effectualTarget.offsetTop,
                "width": effectualTarget.clientWidth,
                "height": effectualTarget.clientHeight
            };

            var targetClientRect = elPad.getBoundingClientRect();
            var offsetX = $event.center.x - targetClientRect.left;
            var offsetY = $event.center.y - targetClientRect.top;

            var effectualOffsetX = 0,
                effectualOffsetY = 0;

            if (offsetX <= effectualPosition.left) {
                effectualOffsetX = 0;
            } else if (offsetX >= effectualPosition.width + effectualPosition.left) {
                effectualOffsetX = effectualPosition.width;
            } else {
                effectualOffsetX = offsetX - effectualPosition.left;
            }

            if (offsetY <= effectualPosition.top) {
                effectualOffsetY = 0;
            } else if (offsetY >= effectualPosition.height + effectualPosition.top) {
                effectualOffsetY = effectualPosition.height;
            } else {
                effectualOffsetY = offsetY - effectualPosition.top;
            }

            // Focus point / Photo size
            $scope.ratio = {
                x: effectualOffsetX / effectualPosition.width,
                y: effectualOffsetY / effectualPosition.height
            };

            // Focus point 
            $scope.focusPosition = {
                "left": effectualOffsetX + effectualPosition.left,
                "top": effectualOffsetY + effectualPosition.top
            };

            // Active face
            var pointX = Math.floor(effectualTarget.naturalWidth * $scope.ratio.x),
                pointY = Math.floor(effectualTarget.naturalHeight * $scope.ratio.y);
            var face = _.find($scope.faces, function(face) {
                return pointX >= face.faceRectangle.left &&
                    pointX <= face.faceRectangle.left + face.faceRectangle.width &&
                    pointY >= face.faceRectangle.top &&
                    pointY <= face.faceRectangle.top + face.faceRectangle.height
            });
            if (face) {
                _.each($scope.faces, function(face) {
                    face.active = false;
                    face.read = false;
                    face.edit = false;
                });
                face.active = true;
            }
        };

        $scope.read = function($event) {
            var face = _.find($scope.faces, function(face) {
                return face.active;
            });
            face && (face.read = true);
        };
        $scope.edit = function($event) {
            var face = _.find($scope.faces, function(face) {
                return face.active;
            });
            face && (face.edit = true);
        };
    }
])

.directive('photoPreview',
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

                    var xMin = previewCentrePointX / mapWidth,
                        xMax = 1 - xMin,
                        yMin = previewCentrePointY / mapHeight,
                        yMax = 1 - yMin;

                    function movePreview() {
                        var offsetX = 0,
                            offsetY = 0;
                        if ($scope.ratio.x <= xMin) {
                            offsetX = 0;
                        } else if ($scope.ratio.x >= xMax) {
                            offsetX = mapWidth - previewContainerWidth;
                        } else {
                            offsetX = Math.floor(mapWidth * $scope.ratio.x) - previewCentrePointX;
                        }

                        if ($scope.ratio.y <= yMin) {
                            offsetY = 0;
                        } else if ($scope.ratio.y >= yMax) {
                            offsetY = mapHeight - previewContainerHeight;
                        } else {
                            offsetY = Math.floor(mapHeight * $scope.ratio.y) - previewCentrePointY;
                        }

                        //$element[0].scrollLeft = offsetX;
                        //$element[0].scrollTop = offsetY;
                        _elMap.style.webkitTransform = 'translate(' + -offsetX + 'px, ' + -offsetY + 'px)';
                    }

                    $scope.$watch('ratio', movePreview);
                    movePreview();
                }
            }
        };
    });