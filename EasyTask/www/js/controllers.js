angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.barData={
    labels: ['Mon', 'Tue', 'Wed', 'Thu'],
    series: [[1, 2, 3, 4]]
  };

  $scope.barOptions = {
                seriesBarDistance: 15
            };

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('TaskCtrl', function($scope, Task, $ionicModal) {
  $scope.tasks = [];
  $scope.task = null;
  $scope.newTask = {name:'test', status:'running'};
  $ionicModal.fromTemplateUrl('templates/model/new_task.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    }
  );
  // Get all the documents
  $scope.refresh = function(){
    Task.all().then(function(tasks){
      $scope.tasks = tasks;
    });
  }

  $scope.addTask = function(){
    $scope.modal.show();
  }

  $scope.createTask = function(){
    Task.add($scope.newTask.name, $scope.newTask.status).then(function(){
      $scope.refresh();
      $scope.modal.hide();});
  }

  $scope.cancel = function(){;
    $scope.modal.hide();
    $scope.refresh();
  }

  $scope.remove = function(task){

  }

  $scope.refresh();
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
