'use strict';

/* Controllers */

var recipeControllers = angular.module('recipeControllers', []);

recipeControllers.controller('RecipeTileCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('recipes/recipes.json').success(function(data) {
        $scope.recipes = data.recipes;
        console.log($scope.recipes);
      });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
