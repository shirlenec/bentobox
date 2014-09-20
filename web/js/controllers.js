var app = angular.module('recipeFinder', []);

app.controller('getController', function($scope, recipeService){
  function init() {
   // var data = recipeService.getRecipes(callback(data));  
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
      console.log ("in service");
      console.log(data);
      return data;
    }).
    error(function(data, status){
      alert ('not working');
    });
    
  }

  init();
});
