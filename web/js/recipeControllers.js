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
  	$scope.submittedIngredients = shared.getAdded().concat(shared.getEssential());
  	$scope.orderProp = "recipeName";
	var allResults = [];
  	var allFilteredResults = [];
	function getRecipes (ingredientList, essentialList) {
	    var ingredient;
	    var results = [];
	    var promises = [];
	    var promise;

	    for (var i in ingredientList){
	      promise = apiCall(ingredientList[i], results);
	      promise.then(function(values){
	        filterRecipes(ingredientList, essentialList, values[0]);
	      });
	      
	      promises.push(promise);
	    }

	    // Check API for each ingredient individually. Add all to a list of all results, which may include duplicates or uncorrect items. 
	    Q.all(promises).then(
	      // filterRecipes(ingredientList, essentialList, results)
	      );
	  }

	function apiCall(ingredient, results) {
	  var deferred = Q.defer();
	  //Michelle
	  // var app_id = "0375a96b";
	  // var app_key = "ad073d0bd45d862d60e9f41b30ad316a";

	  var app_id = "f796d382";
	  var app_key = "781bfd632b62f4b2b3d86dd8b6714f01";
	  var queryString = "https://api.yummly.com/v1/api/recipes?_app_id=" +app_id+ "&_app_key="+app_key+"&q=" + ingredient;
	$.ajax({
	        method:'GET',
	        url:queryString,
	        dataType: 'jsonp',
	        headers:{
	                  'Access-Control-Allow-Origin': '*',
	                  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	                  'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
	                }
	      }).
	      success (function(data, status, headers, config){
	        allResults = allResults.concat(data.matches);
	        deferred.resolve([allResults]);
	      }).
	      error(function(data, status){
	        alert ('not working');
	      });
	    
	    return deferred.promise;
	}

	function filterRecipes (ingredientList, essentialList, results){
	    // Sort results
	    results.sort(function(a, b) {
	      return a.id < b.id;
	    });

	    // Iterate through list, remove duplicates and recipes with ingredients that are provided. 
	    var filteredRecipes = [];
	    var allIngredients = ingredientList.concat(essentialList);
	    for (var i in results){
	      if (i != 0 && results[i] != results[i-1]) {
	        // Check if recipe contains ingredients we don't have. 
	        var currentIngredients = results[i].ingredients;
	        var inList = true;
	          for (var k in currentIngredients){
	            if (jQuery.inArray(currentIngredients[k], allIngredients)<=-1) {
	              inList = false;
	              break;
	            }
	          }

	          if (inList){
	            filteredRecipes.push(results[i]);
	          }
	      }
	    }
	    console.log(filteredRecipes);
	    $scope.recipes = filteredRecipes;
	    $scope.$apply();
	    console.log("RECIPE ARRIVES");
	    console.log($scope.recipes);
	  }

	  $http.get('recipes/' + 'recipes.json').success(function(data){
			$scope.recipes = data.recipes;
		});
	  //getRecipes(shared.getAdded(), shared.getEssential());
  }
]);

recipeControllers.controller('RecipeDetailsCtrl', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http) {
		$http.get('recipes/' + $routeParams.recipeId + '.json').success(function(data){
			$scope.recipe = data;
		});
	}])
