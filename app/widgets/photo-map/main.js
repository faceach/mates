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
            "ratio": 0
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

                    $scope.ratio = mapHeight/imgHeight;
                    $scope.$apply();
                }
            }
        };
    });
