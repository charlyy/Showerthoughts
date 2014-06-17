var thoughtApp = angular.module('thought-app', ['ngResource']).config(
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

thoughtApp.controller('ThoughtCtrl', ['$scope', 'Thought', function($scope, Thought) {
    $scope.thoughts= [];
    $scope.newThought = new Thought();
    Thought.query(function(thoughts) {
      $scope.thoughts = thoughts;
   });

    $scope.saveThought = function() {
      $scope.newThought.$save(function(thought) {
        $scope.thoughts.push(thought)
        $scope.newThought = new Thought();
      });
    }

    $scope.deleteThought = function (thought) {
      thought.$delete(function() {
        position = $scope.thoughts.indexOf(thought);
        $scope.thoughts.splice(position, 1);
      }, function(errors) {
        $scope.errors = errors.data
      });
    }

    // $scope.showThought = function(thought) {
    //   thought.details = true;
    //   thought.editing = false;
    // }

    // $scope.hideThought = function(thought) {
    //   thought.details = false;
    // }

    // $scope.editThought = function(thought) {
    //   thought.editing = true;
    //   thought.details = false;
    // }

    // $scope.updateThought = function(thought) {
    //   thought.$update(function() {
    //     thought.editing = false;
    //   }, function(errors) {
    //     $scope.errors = errors.data
    //   });
    // }

    // $scope.clearErrors = function() {
    //   $scope.errors = null;
    // }
}])