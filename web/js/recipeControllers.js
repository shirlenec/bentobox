'use strict';

/* Controllers */

var recipeControllers = angular.module('recipeControllers', []);

// TODO: This probably doesn't need to be here, but leave it here anyway just in case we want to load a tile one at a time
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


recipeControllers.controller('AllRecipesCtrl', ['$scope', '$http', 'shared',
  function($scope, $http, shared) {
	$http.get('recipes/recipes.json').success(function(data) {
        $scope.recipes = data.recipes;
        $scope.ingredients = shared.getIngredients();
      });
  }]);

recipeControllers.controller('RecipeDetailsCtrl', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http) {
		$http.get('recipes/' + $routeParams.recipeId + '.json').success(function(data){
			$scope.recipe = data;
		});
	}])
