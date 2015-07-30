angular.module('mates.photo.people', [])

.factory('photoPeopleModal', [
    'btfModal',
    '_',
    function(btfModal, _) {
        var modalService = btfModal({
            controller: 'PhotoPeopleCtrl',
            controllerAs: 'modal',
            templateUrl: 'widgets/photo/people/index.tpl.html'
        });
        return {
            "show": function(face) {
                this.face = face;
                this.peopleId = face.PersonId || null;
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
    '_',
    'photoPeopleModal',
    'msgBus',
    function($scope, $q, $http, _, photoPeopleModal, msgBus) {

        /*
            "src": "../test/a_009.jpg",
            "name": "景甜",
            "company": "北京星光灿烂影视有限公司",
            "city": "每天都在飞",
            "highestDegree": "学士",
            "highestUniversity": "北京电影学院",
            "domain": "演员;歌唱;跳舞",
        */
        $scope.people = {
            "visible": false,
            "peopleId": photoPeopleModal.peopleId,
            "src": "",
            "name": "",
            "isSingle": true,
            "company": "",
            "city": "",
            "highestDegree": "",
            "highestUniversity": "",
            "domain": "",
        };

        var defaultPeople = photoPeopleModal.face.people;
        if (defaultPeople) {
            $scope.people = _.extend($scope.people, {
                "visible": defaultPeople.PictureURL ? true : false,
                "src": defaultPeople.PictureURL,
                "name": defaultPeople.Name,
                "isSingle": defaultPeople.IsSingle,
                "company": defaultPeople.Company,
                "city": defaultPeople.CurrentLocation,
                "highestDegree": defaultPeople.HighestDegree,
                "highestUniversity": defaultPeople.HighestCollege,
                "domain": defaultPeople.BusinessScope,
            })
        }

        $scope.closeMe = function() {
            // Emit
            msgBus.emitMsg("cancelEditPeople");

            photoPeopleModal.hide();
        };

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
            // Emit
            msgBus.emitMsg("editPeople", people);

            //var formData = new FormData();
            // Simple POST request example (passing data) :
            var postData = {
                "FaceId": photoPeopleModal.face.FaceId,
                "PeopleId": people.peopleId,
                "Name": people.name,
                "IsSingle": people.isSingle,
                "Company": people.company,
                "CurrentLocation": people.city,
                "HighestDegree": people.highestDegree,
                "HighestCollege": people.highestUniversity,
                "BusinessScope": people.domain,
                "IsSelf": true,
                "WeChatId": "xxx",
                "PictureURL": people.src.split(",")[1],
            };
            $http.post('api/person/upload', postData)
                .success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available

                    // Emit
                    msgBus.emitMsg("addPeople", _.extend(postData, {
                        PictureURL: people.src
                    }));

                    photoPeopleModal.hide();
                })
                .error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.error("api/person/upload: " + status);
                    photoPeopleModal.hide();
                });
        };
    }
]);
