angular.module('starter.controllers', ['angular-chartist'])

.controller('DailyCtrl', function($scope) {})

.controller('GrowthCtrl', function($scope) {
  $scope.growthIndexes = [
  {
    name: '身高',
    target: 'height'
  },
  {
    name: '体重',
    target: 'weight'
  }];
})

.controller('ForumCtrl', function($scope) {
})


.controller('AccountCtrl', function($scope) {
});
