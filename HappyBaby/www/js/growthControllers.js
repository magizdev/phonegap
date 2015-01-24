angular.module('starter.controllers')


.controller('GrowthWeightCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/model/add-growth-index.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });
  $scope.title = 'Weight';
  $scope.lineData = {
    labels: ['Mon', 'Tue', 'Wed'],
    series: [[1, 2, 3]]
  };
  $scope.barOptions = {
    seriesLineDistanse: 15
  };

  $scope.addIndex = function() {
    $scope.modal.show();
  };

  $scope.save = function(){

  };

  $scope.cancel = function() {

  };
})

.controller('GrowthHeightCtrl', function($scope) {
  $scope.title = 'Height';
});
