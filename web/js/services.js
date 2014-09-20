'use strict';

/* Services */

var recipeServices = angular.module('recipeServices', ['ngResource']);

recipeServices.factory('Recipe', ['$resource',
  function($resource){
    return $resource('recipes/:titleSlug.json', {}, {
      query: {method:'GET', params:{titleSlug:'recipes'}, isArray:true}
    });
  }]);
