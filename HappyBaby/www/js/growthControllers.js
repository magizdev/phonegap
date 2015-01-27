angular.module('happybaby.controllers')

.controller('GrowthWeightCtrl', function($scope, $ionicModal, GrowthIndex) {
  $ionicModal.fromTemplateUrl('templates/model/add-growth-index.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });
  $scope.title = 'Weight';
  $scope.lineData = {
    labels:['test'],
    series: [[1]]
  };
  $scope.barOptions = {
    seriesLineDistanse: 15
  };

  var xdate = new XDate();
  xdate.clearTime();
  $scope.newindex = {};
  $scope.newindex.mydate = new Date(xdate.getTime());
  $scope.newindex.myvalue = 0;

  $scope.loadData = function() {
    GrowthIndex.getWeightChartData().then(function(chartData){
      $scope.lineData = chartData;
    })
  };

  $scope.loadData();

  $scope.addIndex = function() {
    $scope.modal.show();
  };

  $scope.save = function(){
    console.log($scope.newindex.mydate);
    console.log($scope.newindex.myvalue);
    GrowthIndex.addWeight($scope.newindex.mydate, $scope.newindex.myvalue);
    $scope.modal.hide();
    $scope.loadData();
  };

  $scope.cancel = function() {
    $scope.modal.hide();
  };
})

.controller('GrowthHeightCtrl', function($scope) {
  $scope.title = 'Height';
});
