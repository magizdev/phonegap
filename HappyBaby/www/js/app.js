// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('happybaby', ['ionic', 'happybaby.controllers', 'happybaby.services', 'happybaby.config'])

.run(function($ionicPlatform, DB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  DB.init();
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile/wizard.html',
    controller: 'ProfileCtrl'
  })
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.daily', {
    url: '/daily',
    views: {
      'tab-daily': {
        templateUrl: 'templates/tab-daily.html',
        controller: 'DailyCtrl'
      }
    }
  })

  .state('tab.growth', {
      url: '/growth',
      views: {
        'tab-growth': {
          templateUrl: 'templates/tab-growth.html',
          controller: 'GrowthCtrl'
        }
      }
    })
    .state('tab.growth-weight', {
      url: '/growth/weight',
      views: {
        'tab-growth': {
          templateUrl: 'templates/growth-index.html',
          controller: 'GrowthWeightCtrl'
        }
      }
    })
    .state('tab.growth-height', {
      url: '/growth/height',
      views: {
        'tab-growth': {
          templateUrl: 'templates/growth-index.html',
          controller: 'GrowthHeightCtrl'
        }
      }
    })

  .state('tab.forum', {
      url: '/forum',
      views: {
        'tab-forum': {
          templateUrl: 'templates/profile/wizard.html',
          controller: 'ForumCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/profile');

});
