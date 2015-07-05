'use strict';

angular.module('mates.menu', [])

.controller('MenuCtrl', [
    '$scope',
    function($scope) {

        $scope.photo = {
            "src": "./img/blank.png"
        };

        $scope.levelSelector = {
            "visible": false
        };

        $scope.toggleLevelSelector = function($event) {
            $scope.levelSelector.visible = !$scope.levelSelector.visible;
        }

        $scope.addPhoto = function($event, levelId) {
            console.log("Selected level: " + levelId)
        }

        $scope.addPhoto = function($files) {
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
]);
