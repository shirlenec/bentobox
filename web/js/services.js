// 'use strict';

// /* Services */

// var phonecatServices = angular.module('phonecatServices', ['ngResource']);

// phonecatServices.factory('Phone', ['$resource',
//   function($resource){
//     return $resource('phones/:phoneId.json', {}, {
//       query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
//     });
//   }]);

// app.service('recipeService', function($http, $q){
// 	this.getRecipes = function() {
// 		console.log("running getRecipes");
// 		var deferred = $q.defer();

// 		$http({
// 			method:'GET',
// 			url:'https://api.yummly.com/v1/api/recipes?_app_id=0375a96b&_app_key=ad073d0bd45d862d60e9f41b30ad316a&q=chicken+wine'
// 		}).
// 		success (function(data, status, headers, config){
// 			q.resolve(data);
// 		}).
// 		error(function(data, status){
// 			q.reject(data);
// 		});

// 		return deferred.promise;
// 	}
// });