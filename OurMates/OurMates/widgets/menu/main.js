'use strict';

angular.module('mates.menu', [])
.controller('MenuCtrl', [
    '$scope',
    'photoAddModal',
    function($scope, photoAddModal) {

        $scope.categorySelector = {
            "visible": false
        };

        $scope.toggleCategorySelector = function($event) {
            $scope.categorySelector.visible = !$scope.categorySelector.visible;
        }

        $scope.addPhoto = function(categoryId){
            $scope.categorySelector.visible = false;
            photoAddModal.show(categoryId);
        };
    }
]);
