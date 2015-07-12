'use strict';

angular.module('mates.menu', [])
.controller('MenuCtrl', [
    '$scope',
    'photoAddModal',
    function($scope, photoAddModal) {

        $scope.levelSelector = {
            "visible": false
        };

        $scope.toggleLevelSelector = function($event) {
            $scope.levelSelector.visible = !$scope.levelSelector.visible;
        }

        $scope.addPhoto = function(levelId){
            $scope.levelSelector.visible = false;
            photoAddModal.show(levelId);
        };
    }
]);
