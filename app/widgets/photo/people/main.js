angular.module('mates.photo.people', [])

.factory('photoPeopleModal', [
    'btfModal',
    '_',
    function(btfModal, _) {
        var modalService = btfModal({
            controller: 'PhotoPeopleCtrl',
            controllerAs: 'modal',
            templateUrl: 'widgets/photo/people/index.html'
        });
        return {
            "show": function(face) {
                this.face = face;
                this.peopleId = 1;
                modalService.activate();
            },
            "hide": function() {
                modalService.deactivate();
            }
        }
    }
])

.controller('PhotoPeopleCtrl', [
    '$scope',
    '$q',
    '$http',
    'photoPeopleModal',
    'msgBus',
    function($scope, $q, $http, photoPeopleModal, msgBus) {

        $scope.people = {
            "visible": false,
            "peopleId": photoPeopleModal.peopleId,
            "src": "",
            "name": "",
            "company": "",
            "city": "",
            "highestDegree": "",
            "highestUniversity": "",
        };

        $scope.closeMe = photoPeopleModal.hide;

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
                $scope.people.src = file;
                $scope.people.visible = true;
            });
        };

        $scope.save = function(people) {
            console.log("Add people params:");
            console.dir(people);

            //var formData = new FormData();
            // Simple POST request example (passing data) :
            $http.post('/photo/add', {
                "peopleId": people.peopleId,
                "src": people.src,
                "name": people.name,
                "company": people.company,
                "city": people.city,
                "highestDegree": people.highestDegree,
                "highestUniversity": people.highestUniversity,
            }).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };
    }
]);
