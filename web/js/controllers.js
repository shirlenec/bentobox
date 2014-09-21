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
      $scope.allIngredients = $scope.newIngredients.concat($scope.selection);
      shared.setIngredients($scope.allIngredients);
      window.location.href = "#/recipes";
    }
  }
]);

app.controller('getController', ['$scope', function($scope){
  var allResults = [];
  var allFilteredResults = [];

  function getRecipes (ingredientList, essentialList) {
    var ingredient;
    var results = [];
    var promises = [];
    var promise;

    for (i in ingredientList){
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
    for (i in results){
      if (i != 0 && results[i] != results[i-1]) {
        // Check if recipe contains ingredients we don't have. 
        var currentIngredients = results[i].ingredients;
        var inList = true;
          for (k in currentIngredients){
            if (!jQuery.inArray(currentIngredients[k], allIngredients)) {
              inList = false;
              break;
            }
          }

          if (inList){
            filteredRecipes.push(results[i]);
          }
      }
    }
    
    $scope.recipes = filteredRecipes;
  }

  // getRecipes(["boneless chicken skinless thigh","dry white wine","chicken stock","heavy cream","grated lemon zest","pappardelle", "salt", "pasta", "flour", 
    // "eggs", "black pepper", "ground black pepper", "yeast", "sugar", "water", "beef"], []);
}]);
