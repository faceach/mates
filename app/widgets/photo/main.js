'use strict';

angular.module('myApp.photo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/photo', {
        templateUrl: 'widgets/photo/index.html',
        controller: 'PhotoCtrl'
    });
}])

.controller('PhotoCtrl', [
    '$scope',
    function($scope) {

        $scope.photo = {
            "file": "",
            "src": ""
        };

        $scope.uploadImage = function($event) {
            /*var files = $event.target.files; // FileList object

            // Loop through the FileList and render image files as thumbnails.
            var f = files[0];*/

            var f = document.getElementById('file').files[0];

            // Only process image files.
            // f.type === "" under Wechat (device: Samsung Android v4.4.x)
            if (f.type && !f.type.match('image.*')) {
                return;
            }

            (new ImagePinch({
                file: f,
                toHeight: 400, // *px
                maxSize: 1024 * 3, // *kb
                success: function(file) {
                    var reader = new FileReader();
                    // Closure to capture the file information.
                    reader.onload = function(e) {
                        var theFile = $scope.photo.src = e.target.result;
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
