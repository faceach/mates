'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ui.router',
        'flow',
        'ngFileUpload',
        'myApp.menu',
        'myApp.search',
        'myApp.photo',
        'myApp.version'
    ])
    .config(['$urlRouterProvider', function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/photo');
    }]);
