'use strict';

/* App Module */

var bentoBoxApp = angular.module('bentoBoxApp', [
  'ngRoute',
  'phonecatAnimations',

  'ingredientListControllers',
  'phonecatFilters',
  'phonecatServices',
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
        templateUrl: 'partials/recipeTile.html',
        controller: 'RecipeTileCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
