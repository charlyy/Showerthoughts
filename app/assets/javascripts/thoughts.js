var thoughtApp = angular.module('thought-app', ['ngResource','mm.foundation']).config(
    ['$httpProvider', function($httpProvider) {
    var authToken = angular.element("meta[name=\"csrf-token\"]").attr("content");
    var defaults = $httpProvider.defaults.headers;

    defaults.common["X-CSRF-TOKEN"] = authToken;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
    defaults.common['Accept'] = 'application/json';
}]);

thoughtApp.factory('Thought', ['$resource', function($resource) {
  return $resource('/thoughts/:id',
     {id: '@id'},
     {update: { method: 'PATCH'}});
}]);

thoughtApp.controller('ThoughtCtrl', ['$scope', 'Thought', '$modal', '$log', '$rootScope',
    function($scope, Thought,  $modal, $log, $rootScope ) {

    $rootScope.thoughts= [];
    $rootScope.newThought = new Thought();
    Thought.query(function(thoughts) {
      $rootScope.thoughts = thoughts;
   });
 
  
    $scope.deleteThought = function (thought) {
      thought.$delete(function() {
        position = $scope.thoughts.indexOf(thought);
        $scope.thoughts.splice(position, 1);
      }, function(errors) {
        $scope.errors = errors.data
      });
    }


      // $scope.items = ['item1', 'item2', 'item3'];

      $scope.open = function () {

        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ThoughtInstanceCtrl',
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

}])

thoughtApp.controller('ThoughtInstanceCtrl', ['$scope', 'Thought', '$modalInstance','$rootScope', 
    function($scope, Thought,  $modalInstance, $rootScope ) {

    $scope.newThought = new Thought();
        Thought.query(function(thoughts) {
          $scope.thoughts = thoughts;
       });
 
      $scope.saveThought = function() {
          $scope.newThought.$save(function(thought) {
            console.log("bleepbloopblap");
            $rootScope.thoughts.unshift(thought);
            console.log("thought was saved");
            $scope.newThought = new Thought();
            $scope.cancel();
          });
        }

      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

}]);