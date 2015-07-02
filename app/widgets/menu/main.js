'use strict';

angular.module('mates.menu', [])

.controller('MenuCtrl', [
    '$scope',
    function($scope) {

        $scope.levelSelector = {
            "visible": false
        };

        $scope.toggleLevelSelector = function($event) {
            $scope.levelSelector.visible = !$scope.levelSelector.visible;
        }

        $scope.addPhoto = function($event, levelId) {
            console.log("Selected level: " + levelId)
        }

    }
]);
