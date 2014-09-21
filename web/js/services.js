'use strict';

/* Services */


var sharedProperties = angular.module('sharedProperties', []);

sharedProperties.service('shared', function() {
	var essential = [];
	var added = [];
	return {
        getAdded: function() {
            return added;
        },
        setAdded: function(value) {
            added = value;
        },
        getEssential: function() {
        	return essential;
        },
        setEssential: function(value) {
        	essential = value
        }
    }
})
