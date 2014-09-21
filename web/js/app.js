'use strict';

/* App Module */

var bentoBoxApp = angular.module('bentoBoxApp', [
  'ngRoute',
  'phonecatAnimations',

  'ingredientListControllers',
  'phonecatFilters',
  'recipeServices',
  'recipeControllers'
]);

bentoBoxApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/ingredient-list.html',
        controller: 'ingredientListCtrl'
      }).
      when('/recipes/:recipeId', {
        templateUrl: 'partials/recipeDetail.html',
        controller: 'RecipeDetailsCtrl'
      }).
      when('/recipes/', {
        templateUrl: 'partials/allRecipes.html',
        controller: 'AllRecipesCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
