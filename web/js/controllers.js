var app = angular.module('recipeFinder', []);

app.controller('getController', function($scope, recipeService){
  function init() {
    var data = recipeService.getRecipes();    
    console.log(data);
    $scope.recipes = data;
  }

  init();
});
