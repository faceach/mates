'use strict';

// Declare app level module which depends on views, and components
angular.module('mates', [
        'ui.router',
        'flow',
        'ngFileUpload',
        'btford.modal',
        'angular-gestures',

        'ng.utils',

        'mates.menu',
        'mates.search',
        'mates.photo',
        'mates.version'
    ])
    .config([
        '$urlRouterProvider',
        'hammerDefaultOptsProvider',
        function($urlRouterProvider, hammerDefaultOptsProvider) {
            // Router
            $urlRouterProvider.otherwise('/photo');
            // Hammer
            hammerDefaultOptsProvider.set({
                recognizers: [
                    [Hammer.Tap, {
                        time: 250
                    }]
                ]
            });
        }
    ]);
