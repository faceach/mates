'use strict';

// Declare app level module which depends on views, and components
angular.module('mates', [
        'ui.router',
        'flow',
        'ngFileUpload',
        'btford.modal',
        'hmTouchEvents',

        'ng.utils',

        'mates.menu',
        'mates.search',
        'mates.photo',
        'mates.version'
    ])
    .config([
        '$urlRouterProvider',
        function($urlRouterProvider) {
            // Router
            $urlRouterProvider.otherwise('/photo');
        }
    ]);
