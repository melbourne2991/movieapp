'use strict';

var app = angular.module('app', [
	'ngAnimate',
	'ui.router',
	'app.services',
	'app.directives',
	'app.controllers'
]).config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', '/');

	$stateProvider
		.state('default', {
			templateUrl: '/templates/home.html',
			controller: 'HomeController',
			url: '/',
		})	
		.state('browseGenre', {
			templateUrl: '/templates/browse_genre.html',
			controller: 'BrowseGenre',
			url: '/browse-genre/:genre_id'
		});
}]);

angular.element(document).ready(function() {
	var initInjector = angular.injector(['ng']);
	var $http 		 = initInjector.get('$http');
	var apiConfig = {		
		url: '/api/3', 
		key: 'iamthewalrus',
		base: null
	};

	$http.get(apiConfig.url + '/configuration?api_key=' + apiConfig.key).then(function(results) {
		apiConfig.base = results.data;
		app.constant('apiConfig', apiConfig);
		angular.bootstrap(document, ['app']);
	});
});
