'use strict';

/* Controllers */

var recipeControllers = angular.module('recipeControllers', []);

recipeControllers.controller('RecipeTileCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: 'motorola-xoom-with-wi-fi'}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
