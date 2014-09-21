var app = angular.module('recipeFinder', []);

app.controller('getController', function($scope){
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
  var queryString = "https://api.yummly.com/v1/api/recipes?_app_id=0375a96b&_app_key=ad073d0bd45d862d60e9f41b30ad316a&q=" + ingredient;
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

  getRecipes(["boneless chicken skinless thigh","dry white wine","chicken stock","heavy cream","grated lemon zest","pappardelle", "salt", "pasta", "flour", 
    "eggs", "black pepper", "ground black pepper", "yeast", "sugar", "water", "beef"], []);
});
