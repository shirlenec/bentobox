// 'use strict';

// /* Controllers */

// var phonecatControllers = angular.module('phonecatControllers', []);

var app = angular.module('recipeFinder', []);
// app.controller('getController', ['$scope', 'Phone',
//   function($scope, Phone) {
//     $scope.phones = Phone.query();
//     $scope.orderProp = 'age';
//   }]);

// phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//   function($scope, $routeParams, Phone) {
//     $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//       $scope.mainImageUrl = phone.images[0];
//     });

//     $scope.setImage = function(imageUrl) {
//       $scope.mainImageUrl = imageUrl;
//     }
//   }]);


app.controller('getController', function($scope, recipeService){
  function init() {
    console.log("init");
    recipeService.getRecipes()
      .then(function(data) {
        console.log(data);
        $scope.recipes = data;
      }, function(error){
        alert('errror');
      });
    
  }

  init();
});

app.service('recipeService', function($http, $q){
  this.getRecipes = function() {
    var deferred = $q.defer();
    // var photos = function (data) {
    //  alert(data);
    // };

    $http({
      method:'GET',
      url:'https://api.yummly.com/v1/api/recipes?_app_id=0375a96b&_app_key=ad073d0bd45d862d60e9f41b30ad316a&q=chicken+wine',
     // dataType: 'jsonp',
     // jsonp: false,
     // jsonpCallback: 'photos',
      crossDomain: true,
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