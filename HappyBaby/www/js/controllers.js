angular.module('happybaby.controllers', ['angular-chartist'])

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
})

.controller('ProfileCtrl', function($scope, Profile, $state) {
	$scope.loaded = false;
	Profile.load().then(function(result){
		console.log('result ' + result);
		if(result.name) {
			console.log('test');
			$state.go('tab.daily');
		} else {
			$scope.loaded = true;
			$scope.profile = result;
			$scope.profile.name = '';
			$scope.profile.birthday = new Date();
			$scope.profile.gender = 0;
			$scope.profile.birthWeight = 3.5;
			$scope.profile.birthHeight = 50;
		}
	});

	$scope.save = function() {
		console.log('save');
		var profile = angular.copy($scope.profile);
		profile.birthday = new XDate(profile.birthday);
		Profile.update(profile);
		$state.go('tab.daily');
	}
});
