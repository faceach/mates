'use strict';

// Declare app level module which depends on views, and components
angular.module('mates', [
        'ui.router',
        'flow',
        'ngFileUpload',
        'btford.modal',
        'hmTouchEvents',

        'ng.utils',
        'mates.weixin',

        'mates.menu',
        'mates.search',
        'mates.account',

        'mates.photo',
        'mates.photo.add',
        'mates.photo.map',
        'mates.photo.fullscreen',
        'mates.photo.people',

        'mates.version',

        /*'templates-main'*/
    ])
    .config([
        '$urlRouterProvider',
        function($urlRouterProvider) {
            // Router
            $urlRouterProvider.otherwise('/photo');
        }
    ]);
