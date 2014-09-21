var app = angular.module('recipeFinder', []);

var ingredientListControllers = angular.module('ingredientListControllers', []);

ingredientListControllers.controller('ingredientListCtrl', ['$scope', 'shared',
  function($scope, shared) {
    $scope.ingredientToAdd = "";
    $scope.newIngredients = [];
    $scope.addIngredient = function () {
      angular.element("#ingredient-list")[0].innerHTML += "<li>" + $scope.ingredientToAdd + "</li>";
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
      shared.setAdded($scope.newIngredients);
      shared.setEssential($scope.selection);
      window.location.href = "#/recipes";
    }
  }
]);
