angular.module('mates.photo.fullscreen', [])

.factory('photoFullscreenModal', [
    'btfModal',
    '_',
    function(btfModal, _) {
        var modalService = btfModal({
            controller: 'PhotoFullscreenCtrl',
            controllerAs: 'modal',
            templateUrl: 'widgets/photo/fullscreen/index.tpl.html'
        });
        return {
            "show": function(photoSrc) {
                this.photoSrc = photoSrc;
                modalService.activate();
            },
            "hide": function() {
                modalService.deactivate();
            }
        }
    }
])

.controller('PhotoFullscreenCtrl', [
    '$scope',
    '$q',
    '$http',
    'photoFullscreenModal',
    'msgBus',
    function($scope, $q, $http, photoFullscreenModal, msgBus) {

        $scope.photo = {
            "src": photoFullscreenModal.photoSrc
        };

        $scope.closeMe = photoFullscreenModal.hide;

        $scope.portrait = function($event) {
            $scope.closeMe();
        };

    }
]);