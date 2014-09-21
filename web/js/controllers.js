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
    
    // Replace common items that have many names, with all their names in allIngredients
    // for (k in results){
    //  
    // }

    for (i in results){
      if (i != 0 && results[i] != results[i-1]) {
        // Replace common items
        // var current = allIngredients[k];
        // if (current.indexOf("pasta") > -1 && current.indexOf("sauce") <= -1 && current.indexOf("gluten-free") <= -1 && current.indexOf("egg") <= -1 && current.indexOf("sheets") <= -1) {
        //   allIngredients[k] = "pasta";
        // } else if (current.indexOf("rice") > -1 && current.indexOf("flour") <=-1 && current.indexOf("wine")<=-1 &&
        //  current.indexOf("Krispies") <=-1 && current.indexOf("noodles") <=-1 && current.indexOf("cereal")<=-1 &&
        //   current.indexOf("Chex")<=-1 && current.indexOf("licorice")<=-1 && current.indexOf("paper")<=-1 &&
        //    current.indexOf("milk")<=-1 && current.indexOf("vermicelli")<=-1 && current.indexOf("risotto")<=-1 && 
        //    current.indexOf("stick")<=-1 && current.indexOf("syrup")<= -1 && current.indexOf("glutinous")<= -1 &&
        //     current.indexOf("bran")<= -1 && current.indexOf("puffed")<= -1 && current.indexOf("Chicken")<= -1 &&
        //      current.indexOf("liquorice")<= -1 && current.indexOf("chaurice")<= -1 && current.indexOf("Roni") <= -1 &&
        //       current.indexOf("vinegar")<= -1)
        // {
        //   allIngredients[k] = "rice";
        // }

        // Check if recipe contains ingredients we don't have. 
        var currentIngredients = results[i].ingredients;
        var inList = true;
          for (k in currentIngredients){
            if (jQuery.inArray(currentIngredients[k], allIngredients)<=-1) {
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

 //  getRecipes(["white rice","coarse salt","water"], []);
});
