'use strict';

angular.module('mates.photo', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('photo', {
        url: "/photo",
        views: {
            "menu": {
                templateUrl: 'widgets/menu/index.html',
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
    function($scope, $http, _) {
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
                x: (effectualOffsetX / effectualPosition.width).toFixed(4),
                y: (effectualOffsetY / effectualPosition.height).toFixed(4)
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

        $scope.onFileSelect = function($files) {
            console.log("files exist");

            if (!$files || $files.length <= 0) {
                return;
            }
            // Loop through the FileList and render image files as thumbnails.
            var f = $files[0];

            // Only process image files.
            // f.type === "" under Wechat (device: Samsung Android v4.4.x)
            if (f.type && !f.type.match('image.*')) {
                return;
            }

            (new ImagePinch({
                file: f,
                toHeight: 400, // *px
                maxSize: 512, // *kb
                success: function(file) {
                    var reader = new FileReader();
                    // Closure to capture the file information.
                    reader.onload = function(e) {
                        var theFile = $scope.photo.src = e.target.result;

                        // TODO: do not call $apply()
                        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                            $scope.$apply();
                        }

                        // Render thumbnail.
                        /*loadImage.parseMetaData(theFile, function(data) {
                            var rotation = 0;
                            if (data && data.exif) {
                                var orientation = data.exif.get('Orientation');
                                if (orientation === 8) {
                                    rotation = 90;
                                } else if (orientation === 3) {
                                    rotation = 180;
                                } else if (orientation === 6) {
                                    rotation = 270;
                                }
                            }
                            processRequest(true, theFile, null, theFile.size, rotation);
                        });*/
                    };
                    // Read in the image file as a data URL.
                    reader.readAsDataURL(file);
                }
            })).pinch();
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

                    var xMin = (previewCentrePointX / mapWidth).toFixed(4),
                        xMax = 1 - xMin,
                        yMin = (previewCentrePointY / mapHeight).toFixed(4),
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
