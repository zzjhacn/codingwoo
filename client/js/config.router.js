'use strict';

/**
 * Config for the router
 */
angular.module('MyTools')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .otherwise('/app/dashboard');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'pages/app.html'
                    })
                    .state('app.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'pages/app_dashboard.html'
                    })
                    .state('app.local', {
                        url: '/local',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.local.mvn', {
                        url: '/mvn',
                        templateUrl: 'pages/mvnviewer.html',
                        resolve: {
                          deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                              return $ocLazyLoad.load(['./node_modules/nestable-fork/dist/jquery.nestable.min.js','./node_modules/nestable-fork/dist/jquery.nestable.min.css']);
                          }]
                        }
                    })
                    .state('app.dbms', {
                        url: '/dbms',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.dbms.props', {
                        url: '/props',
                        templateUrl: 'pages/props.html'
                    })
                    .state('app.dbms.host', {
                        url: '/host',
                        template: '<gray-rest-crud template-url=" pages/tpl/tpl-frame.html " server-url="http://localhost:33019/" server-what="host"></gray-rest-crud>'
                    })
                    .state('app.monitor', {
                        url: '/dbms',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.monitor.heartbeat', {
                        url: '/heartbeat',
                        template: '<gray-rest-crud template-url=" pages/tpl/tpl-frame.html " server-url="http://localhost:33019/" server-what="heartbeat"></gray-rest-crud>'
                    })
                    .state('app.monitor.config', {
                        url: '/configurations',
                        template: '<gray-rest-crud template-url=" pages/tpl/tpl-frame.html " server-url="http://localhost:33019/" server-what="configurations"></gray-rest-crud>'
                    })
            }
        ]
    );
