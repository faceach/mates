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
    function($scope) {

        $scope.photo = {
            "src": "../test/004.jpg"
        };
        $scope.ratio = {
            "x": 0.5,
            "y": 0.5
        };
        $scope.focusPosition = {
            "left": "50%",
            "top": "50%"
        };

        $scope.padMove = function($event) {
            var panWidth = $event.target.clientWidth;
            var panHeight = $event.target.clientHeight;

            var offsetX = $event.center.x - $event.target.x;
            var offsetY = $event.center.y - $event.target.y;

            $scope.ratio = {
                x: offsetX / panWidth,
                y: offsetY / panHeight
            };

            $scope.focusPosition = {
                "left": offsetX + $event.target.offsetLeft,
                "top": offsetY + $event.target.offsetTop
            }
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

.directive('photoPreview', function() {
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

            var _elImg = $element.find("img")[0];

            _elImg.onload = function(evt) {
                var elImg = evt.target;
                var imgWidth = elImg.offsetWidth;
                var imgHeight = elImg.offsetHeight;

                var xMin = previewCentrePointX / imgWidth,
                    xMax = 1 - xMin,
                    yMin = previewCentrePointY / imgHeight,
                    yMax = 1 - yMin;

                var offsetX = 0,
                    offsetY = 0;
                $scope.$watch('ratio', function() {
                    if ($scope.ratio.x > xMin && $scope.ratio.x < xMax) {
                        offsetX = imgWidth * $scope.ratio.x - previewCentrePointX;
                    }
                    if ($scope.ratio.y > yMin && $scope.ratio.y < yMax) {
                        offsetY = imgHeight * $scope.ratio.y - previewCentrePointY;
                    }

                    //$element[0].scrollLeft = offsetX;
                    //$element[0].scrollTop = offsetY;
                    elImg.style.webkitTransform = 'translate(' + -offsetX + 'px, ' + -offsetY + 'px)';
                });
            }
        }
    };
});
