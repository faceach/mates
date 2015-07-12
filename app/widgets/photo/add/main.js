angular.module('mates.photo.add', [])

.factory('photoAddModal', [
    'btfModal',
    '_',
    function(btfModal, _) {
        var modalService = btfModal({
            controller: 'PhotoAddCtrl',
            controllerAs: 'modal',
            templateUrl: 'widgets/photo/add/index.html'
        });
        return {
            "show": function(levelId) {
                this.levelId = levelId;
                modalService.activate();
            },
            "hide": function() {
                modalService.deactivate();
            }
        }
    }
])

.controller('PhotoAddCtrl', [
    '$scope',
    '$q',
    '$http',
    'photoAddModal',
    'msgBus',
    function($scope, $q, $http, photoAddModal, msgBus) {

        $scope.photo = {
            "visible": false,
            "src": "./img/blank.png",
            "levelId": photoAddModal.levelId
        };

        $scope.closeMe = photoAddModal.hide;

        function photoReader($files) {
            var deferred = $q.defer();

            if (!$files || $files.length <= 0) {
                deferred.reject("No files selected");
            } else {
                // Loop through the FileList and render image files as thumbnails.
                var f = $files[0];

                // Only process image files.
                // f.type === "" under Wechat (device: Samsung Android v4.4.x)
                if (f.type && !f.type.match('image.*')) {
                    deferred.reject("Select photo please");
                } else {
                    (new ImagePinch({
                        file: f,
                        toHeight: 1200, // *px (max height)
                        maxSize: 512, // *kb
                        success: function(file) {
                            var reader = new FileReader();
                            // Closure to capture the file information.
                            reader.onload = function(e) {
                                deferred.resolve(e.target.result);
                            };
                            // Read in the image file as a data URL.
                            reader.readAsDataURL(file);
                        }
                    })).pinch();
                }
            }

            return deferred.promise;
        }

        $scope.readPhoto = function($files) {
            photoReader($files).then(function(file) {
                $scope.photo.src = file;
                $scope.photo.visible = true;
            });
        };

        $scope.save = function(photo) {
            console.log("Add photo params:");
            console.dir(photo);
            // Emit
            msgBus.emitMsg("addPhoto", photo);
            photoAddModal.hide();
        };
    }
]);