
app.service('recipeService', function($http, $q){
  this.getRecipes = function() {
    var deferred = $q.defer();
    // var photos = function (data) {
    //  alert(data);
    // };

    $.ajax({
      method:'GET',
      url:'https://api.yummly.com/v1/api/recipes?_app_id=0375a96b&_app_key=ad073d0bd45d862d60e9f41b30ad316a&q=chicken+wine',
      dataType: 'jsonp',
      headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
              }
    }).
    success (function(data, status, headers, config){
      q.resolve(data);
    }).
    error(function(data, status){
      q.reject(data);
    });

    return deferred.promise;
  }
});