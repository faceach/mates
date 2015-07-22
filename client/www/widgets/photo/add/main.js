angular.module('mates.photo.add', [])

.factory('photoAddModal', [
    'btfModal',
    '_',
    function(btfModal, _) {
        var modalService = btfModal({
            controller: 'PhotoAddCtrl',
            controllerAs: 'modal',
            templateUrl: 'widgets/photo/add/index.tpl.html'
        });
        return {
            "show": function(categoryId) {
                this.categoryId = categoryId;
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
            "categoryId": photoAddModal.categoryId
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
            //photoAddModal.hide();

            //var formData = new FormData();
            // Simple POST request example (passing data) :
            $http.post('api/photo/upload', {
                "CategoryId": photo.categoryId,
                "Class": photo.class,
                "GraduationYear": photo.graduationYear,
                "School": photo.school,
                "SchoolLevel": photo.schoolLevel,
                "Summary": photo.summary,
                "Src": photo.src.split(",")[1],
            }).
            success(function(data, status, headers, config) {
                var data = {
                        "AnalyticsEvent": null,
                        "Category": 0,
                        "Description": "OK",
                        "Faces": [{
                            "Age": 34,
                            "FaceId": "d8aba3ff-c4c5-4214-8b9e-262182bffc86",
                            "Gender": "male",
                            "Height": 42,
                            "LeftPosition": 457,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 491,
                            "Width": 42
                        }, {
                            "Age": 23,
                            "FaceId": "9e8f023e-1a6e-434b-b21a-d82ea6f0a4eb",
                            "Gender": "male",
                            "Height": 39,
                            "LeftPosition": 846,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 407,
                            "Width": 39
                        }, {
                            "Age": 20,
                            "FaceId": "0491efa0-11bd-4469-bb6c-c07584f73703",
                            "Gender": "female",
                            "Height": 39,
                            "LeftPosition": 544,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 506,
                            "Width": 39
                        }, {
                            "Age": 26,
                            "FaceId": "70140c5e-396b-43ab-8630-ff9153042258",
                            "Gender": "male",
                            "Height": 39,
                            "LeftPosition": 949,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 396,
                            "Width": 39
                        }, {
                            "Age": 28,
                            "FaceId": "9145cd6b-0d84-4e7d-8eb8-516894848020",
                            "Gender": "male",
                            "Height": 38,
                            "LeftPosition": 509,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 377,
                            "Width": 38
                        }, {
                            "Age": 6,
                            "FaceId": "92d871a6-b060-49ba-b104-216d6d02d95d",
                            "Gender": "female",
                            "Height": 38,
                            "LeftPosition": 649,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 511,
                            "Width": 38
                        }, {
                            "Age": 37,
                            "FaceId": "bcd5d1f3-4264-4bd7-aa91-eb893bcb8d66",
                            "Gender": "male",
                            "Height": 38,
                            "LeftPosition": 1053,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 396,
                            "Width": 38
                        }, {
                            "Age": 49,
                            "FaceId": "12d929ef-7172-4a14-9807-9e5eb30ffc75",
                            "Gender": "male",
                            "Height": 38,
                            "LeftPosition": 280,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 395,
                            "Width": 38
                        }, {
                            "Age": 8,
                            "FaceId": "8a184ef2-729b-4793-86c7-caf91688fa01",
                            "Gender": "female",
                            "Height": 37,
                            "LeftPosition": 319,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 349,
                            "Width": 37
                        }, {
                            "Age": 29,
                            "FaceId": "687a5d51-d92f-4bfd-b334-3479be655150",
                            "Gender": "male",
                            "Height": 37,
                            "LeftPosition": 406,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 391,
                            "Width": 37
                        }, {
                            "Age": 18,
                            "FaceId": "3518d5bb-4b01-4e83-85f2-7109005907ee",
                            "Gender": "female",
                            "Height": 37,
                            "LeftPosition": 836,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 516,
                            "Width": 37
                        }, {
                            "Age": 29,
                            "FaceId": "f40e8998-35bd-4c62-851e-d3ef3c2bf36d",
                            "Gender": "female",
                            "Height": 36,
                            "LeftPosition": 744,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 401,
                            "Width": 36
                        }, {
                            "Age": 19,
                            "FaceId": "f285bdf4-3a46-4dce-9827-12004abf0fb3",
                            "Gender": "female",
                            "Height": 36,
                            "LeftPosition": 288,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 505,
                            "Width": 36
                        }, {
                            "Age": 5,
                            "FaceId": "34c59b2b-2a81-481e-85dd-4df7f094e47a",
                            "Gender": "female",
                            "Height": 36,
                            "LeftPosition": 936,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 511,
                            "Width": 36
                        }, {
                            "Age": 7,
                            "FaceId": "d799f238-2b1a-451b-8059-5ac01b75fc06",
                            "Gender": "female",
                            "Height": 36,
                            "LeftPosition": 376,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 499,
                            "Width": 36
                        }, {
                            "Age": 14,
                            "FaceId": "a03d8c2f-609e-45a2-9ccd-94cdf6c59c33",
                            "Gender": "female",
                            "Height": 35,
                            "LeftPosition": 746,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 504,
                            "Width": 35
                        }, {
                            "Age": 16,
                            "FaceId": "4a2a5cc9-df49-4c36-9d2b-6427c413f910",
                            "Gender": "female",
                            "Height": 35,
                            "LeftPosition": 634,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 386,
                            "Width": 35
                        }, {
                            "Age": 6,
                            "FaceId": "7d791d96-c57e-4d9f-9f05-86f5fde9c236",
                            "Gender": "female",
                            "Height": 35,
                            "LeftPosition": 1038,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 505,
                            "Width": 35
                        }, {
                            "Age": 4,
                            "FaceId": "994cfb60-cf22-4e0a-b9ca-27722940d3f4",
                            "Gender": "female",
                            "Height": 34,
                            "LeftPosition": 189,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 501,
                            "Width": 34
                        }, {
                            "Age": 21,
                            "FaceId": "1e3fd198-9039-401e-98a4-e7f4b1e1d0cb",
                            "Gender": "male",
                            "Height": 34,
                            "LeftPosition": 764,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 173,
                            "Width": 34
                        }, {
                            "Age": 20,
                            "FaceId": "c987e294-f5de-4fda-8ecc-32eab1ad92f5",
                            "Gender": "female",
                            "Height": 34,
                            "LeftPosition": 1002,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 354,
                            "Width": 34
                        }, {
                            "Age": 21,
                            "FaceId": "0b7c49e4-286a-4285-a176-10541ca1a72d",
                            "Gender": "female",
                            "Height": 33,
                            "LeftPosition": 664,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 337,
                            "Width": 33
                        }, {
                            "Age": 12,
                            "FaceId": "3785f54b-6907-45f1-a9b5-80e1018114ba",
                            "Gender": "female",
                            "Height": 33,
                            "LeftPosition": 1105,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 353,
                            "Width": 33
                        }, {
                            "Age": 10,
                            "FaceId": "333670f6-2678-40ca-aa52-e6658c004bf4",
                            "Gender": "female",
                            "Height": 33,
                            "LeftPosition": 574,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 332,
                            "Width": 33
                        }, {
                            "Age": 4,
                            "FaceId": "0911f55b-e842-4244-843c-965d1f09cd36",
                            "Gender": "female",
                            "Height": 33,
                            "LeftPosition": 96,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 508,
                            "Width": 33
                        }, {
                            "Age": 11,
                            "FaceId": "f5f7fb49-a494-4d5e-b4af-42e2da1db199",
                            "Gender": "female",
                            "Height": 33,
                            "LeftPosition": 1061,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 267,
                            "Width": 33
                        }, {
                            "Age": 6,
                            "FaceId": "e4510c01-7044-45cd-8c95-9d326dbf6dee",
                            "Gender": "female",
                            "Height": 32,
                            "LeftPosition": 815,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 340,
                            "Width": 32
                        }, {
                            "Age": 17,
                            "FaceId": "73c86914-81a0-4e41-859a-32584f5391e8",
                            "Gender": "female",
                            "Height": 32,
                            "LeftPosition": 168,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 359,
                            "Width": 32
                        }, {
                            "Age": 19,
                            "FaceId": "fdd85981-f5f3-4e3c-a871-20c2542a2093",
                            "Gender": "male",
                            "Height": 32,
                            "LeftPosition": 205,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 193,
                            "Width": 32
                        }, {
                            "Age": 21,
                            "FaceId": "0fcb33a3-9cea-491c-80b1-6a4a1dd6eb1a",
                            "Gender": "male",
                            "Height": 31,
                            "LeftPosition": 839,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 183,
                            "Width": 31
                        }, {
                            "Age": 29,
                            "FaceId": "aec71b07-ff48-425e-af5f-d9da92c2761b",
                            "Gender": "female",
                            "Height": 31,
                            "LeftPosition": 991,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 177,
                            "Width": 31
                        }, {
                            "Age": 5,
                            "FaceId": "c2e7ed61-ffb8-452a-9a62-4928c2cfaf65",
                            "Gender": "female",
                            "Height": 31,
                            "LeftPosition": 907,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 345,
                            "Width": 31
                        }, {
                            "Age": 11,
                            "FaceId": "fd325f5b-15c6-47d4-a4ab-8dad6374012b",
                            "Gender": "female",
                            "Height": 31,
                            "LeftPosition": 729,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 334,
                            "Width": 31
                        }, {
                            "Age": 17,
                            "FaceId": "bb214951-510a-453d-9aa9-c636c2257d86",
                            "Gender": "male",
                            "Height": 31,
                            "LeftPosition": 170,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 431,
                            "Width": 31
                        }, {
                            "Age": 8,
                            "FaceId": "1e75f281-3481-4545-92f7-aa243e370cf2",
                            "Gender": "female",
                            "Height": 31,
                            "LeftPosition": 854,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 246,
                            "Width": 31
                        }, {
                            "Age": 20,
                            "FaceId": "5a3c8d60-6988-4ba4-a452-e25575f86022",
                            "Gender": "male",
                            "Height": 31,
                            "LeftPosition": 217,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 262,
                            "Width": 31
                        }, {
                            "Age": 8,
                            "FaceId": "e1de07a5-351d-47c5-89ae-70dcf00fff01",
                            "Gender": "female",
                            "Height": 31,
                            "LeftPosition": 493,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 337,
                            "Width": 31
                        }, {
                            "Age": 12,
                            "FaceId": "430d128a-0e4c-462f-93f8-32c3bfae8145",
                            "Gender": "female",
                            "Height": 31,
                            "LeftPosition": 555,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 245,
                            "Width": 31
                        }, {
                            "Age": 5,
                            "FaceId": "9f6bf3d6-4a64-4653-9707-363398fab411",
                            "Gender": "female",
                            "Height": 30,
                            "LeftPosition": 780,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 248,
                            "Width": 30
                        }, {
                            "Age": 20,
                            "FaceId": "fd6ac806-65f4-4e91-9c77-0a476628c741",
                            "Gender": "female",
                            "Height": 30,
                            "LeftPosition": 248,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 347,
                            "Width": 30
                        }, {
                            "Age": 5,
                            "FaceId": "9b325571-dc4b-4a88-9435-be8887df9b22",
                            "Gender": "female",
                            "Height": 30,
                            "LeftPosition": 388,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 254,
                            "Width": 30
                        }, {
                            "Age": 23,
                            "FaceId": "703062ad-73fb-4436-ad7d-9840ff45a258",
                            "Gender": "female",
                            "Height": 30,
                            "LeftPosition": 379,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 182,
                            "Width": 30
                        }, {
                            "Age": 20,
                            "FaceId": "fd417e5e-da87-4424-b3f1-bd9be21bc197",
                            "Gender": "female",
                            "Height": 30,
                            "LeftPosition": 490,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 172,
                            "Width": 30
                        }, {
                            "Age": 6,
                            "FaceId": "c236153e-8d9b-407c-a445-fe5dc73473c6",
                            "Gender": "female",
                            "Height": 30,
                            "LeftPosition": 625,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 245,
                            "Width": 30
                        }, {
                            "Age": 12,
                            "FaceId": "75a25ff8-e817-419d-816e-cb990985290f",
                            "Gender": "female",
                            "Height": 30,
                            "LeftPosition": 380,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 345,
                            "Width": 30
                        }, {
                            "Age": 20,
                            "FaceId": "99d8bc1d-1f08-4e35-bdbd-255833f09cef",
                            "Gender": "female",
                            "Height": 30,
                            "LeftPosition": 284,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 184,
                            "Width": 30
                        }, {
                            "Age": 6,
                            "FaceId": "4913cfa7-455c-4053-ba8f-d953231606ea",
                            "Gender": "female",
                            "Height": 30,
                            "LeftPosition": 462,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 241,
                            "Width": 30
                        }, {
                            "Age": 20,
                            "FaceId": "b2d660ad-b556-4fc2-aeea-15f5f785b578",
                            "Gender": "female",
                            "Height": 29,
                            "LeftPosition": 680,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 173,
                            "Width": 29
                        }, {
                            "Age": 11,
                            "FaceId": "197bb6e9-f4cf-409c-9fc1-d2a22b94cf42",
                            "Gender": "female",
                            "Height": 29,
                            "LeftPosition": 700,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 237,
                            "Width": 29
                        }, {
                            "Age": 7,
                            "FaceId": "200a60ab-4d98-4e04-bac0-bfa2c92f14a0",
                            "Gender": "female",
                            "Height": 29,
                            "LeftPosition": 580,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 173,
                            "Width": 29
                        }, {
                            "Age": 5,
                            "FaceId": "09108f51-dcf4-449a-a6e4-bfad6346aae4",
                            "Gender": "female",
                            "Height": 29,
                            "LeftPosition": 932,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 250,
                            "Width": 29
                        }, {
                            "Age": 20,
                            "FaceId": "d238e0b5-37a3-4bf2-8171-fe5b767c64bd",
                            "Gender": "female",
                            "Height": 28,
                            "LeftPosition": 297,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 262,
                            "Width": 28
                        }, {
                            "Age": 6,
                            "FaceId": "f2c10715-c6f9-4892-94ba-e84222c6bc04",
                            "Gender": "female",
                            "Height": 28,
                            "LeftPosition": 905,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 172,
                            "Width": 28
                        }, {
                            "Age": 5,
                            "FaceId": "004c5cba-4f9c-43e2-bd30-e30ba1c814d7",
                            "Gender": "female",
                            "Height": 28,
                            "LeftPosition": 150,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 274,
                            "Width": 28
                        }, {
                            "Age": 4,
                            "FaceId": "cf820dc1-5d6e-47af-8eb4-2c24f71c4c38",
                            "Gender": "female",
                            "Height": 28,
                            "LeftPosition": 1000,
                            "PersonId": null,
                            "PhotoId": "ea0cdad9b7a5478791c8de6079a9e1b5",
                            "TopPosition": 262,
                            "Width": 28
                        }],
                        "PhotoId": null,
                        "PhotoURL": "https:\/\/prodcards.blob.core.chinacloudapi.cn\/mates-photo\/photo\/ea0cdad9b7a5478791c8de6079a9e1b5.jpg",
                        "Score": 0
                    }
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