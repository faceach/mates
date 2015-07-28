'use strict';

// Declare app level module which depends on views, and components
angular.module('mates', [
    'ui.router',
    'flow',
    'ngFileUpload',
    'btford.modal',
    'hmTouchEvents',
    //'angular-loading-bar',

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

    'templates-main'
])
    .config([
        '$urlRouterProvider',
        //'cfpLoadingBarProvider',
        function($urlRouterProvider/*, cfpLoadingBarProvider*/) {
            // Router
            $urlRouterProvider.otherwise(function($injector, $location) {
                return '/photo/de15051d69e841bb90f7f78410ef312a';
            });

            // Loading Bar Configuration
            //cfpLoadingBarProvider.includeSpinner = false;
            //cfpLoadingBarProvider.includeBar = true;
            //cfpLoadingBarProvider.latencyThreshold = 500;
        }
    ]);