'use strict';

angular.module('mates.menu', [])
.controller('MenuCtrl', [
    '$scope',
    'addPhotoModal',
    function($scope, addPhotoModal) {

        $scope.levelSelector = {
            "visible": false
        };

        $scope.toggleLevelSelector = function($event) {
            $scope.levelSelector.visible = !$scope.levelSelector.visible;
        }

        $scope.addPhoto = function(levelId){
            $scope.levelSelector.visible = false;
            addPhotoModal.show(levelId);
        };
    }
]);
