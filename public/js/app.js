'use strict';

var app = angular.module('app', [
	'ngAnimate',
	'ui.router',
	'app.services',
	'app.directives',
	'app.controllers'
]).config(['$httpProvider', '$stateProvider', function($httpProvider, $stateProvider) {
	$stateProvider
		.state('default', {
			templateUrl: '/templates/home.html',
			url: '',
		})	
		.state('random', {
			templateUrl: '/templates/browse_genre.html',
			controller: 'BrowseGenre'
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
