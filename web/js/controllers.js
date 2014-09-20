'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
    $scope.ingredientToAdd = "";
    $scope.newIngredients = [];
    $scope.addIngredient = function () {
      angular.element("#ingredient-list")[0].innerHTML += "<br>" + $scope.ingredientToAdd;
      $scope.newIngredients.push($scope.ingredientToAdd);
      $scope.ingredientToAdd = "";
    }

    $scope.essentials = [ 'eggs', 'flour', 'sugar', 'butter', 'oil', 'water', 'milk' ];

    $scope.selection = $scope.essentials.slice(0);

    $scope.toggleSelection = function(essential) {
      var idx = $scope.selection.indexOf(essential);

      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.selection.push(fruitName);
      }
    }

    $scope.findRecipes = function() {
      $scope.allIngredients = $scope.newIngredients.concat($scope.selection);
      console.log($scope.allIngredients);
    }
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

