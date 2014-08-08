var controllers = angular.module('app.controllers', ['app.services']);

controllers.controller('MainController', [
	'$scope',
	'$state',
	'movieApi',
	'chosenGenre',

	function($scope, $state, movieApi, chosenGenre) {
		$scope.menu_hover = false;
	}]);

controllers.controller('BrowseGenre', [
	'$scope', 
	'$state', 
	'movieApi', 
	'chosenGenre', 

	function($scope, $state, movieApi) {
		$scope.genre = false;

		movieApi.getGenres().then(function(genres) {
			var genre = _.find(genres, function(genre) {
				return genre.id === parseInt($state.params.genre_id);
			});

			$scope.genre = genre;
		});
	}]);

controllers.controller('HomeController', [
	'$scope', 
	'$state', 
	'movieApi', 
	'chosenGenre', 

	function($scope, $state, movieApi, chosenGenre) {
		console.log('in home controller')
		console.log(movieApi);

		$scope.loaded = false;	

		movieApi.getGenres().then(function(genres) {
			// Create grid array
			var genre_rows = [];

			// Divide by 4
			var splicer = function(to_splice) {
				genre_rows.push(genres.splice(0, 4));
				if(genres.length > 0) splicer();
			};

			splicer();

			$scope.genre_rows = genre_rows;
			$scope.loaded = true;
		});
	}]);


