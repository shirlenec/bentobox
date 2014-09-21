'use strict';

/* Services */


var sharedProperties = angular.module('sharedProperties', []);

sharedProperties.service('shared', function() {
	var ingredients = [];
	return {
        getIngredients: function() {
            return ingredients;
        },
        setIngredients: function(value) {
            ingredients = value;
        }
    }
})
