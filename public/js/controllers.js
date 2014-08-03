var controllers = angular.module('app.controllers', ['app.services']);

controllers.controller('MainController', [
	'$scope',
	'$state',
	'movieApi',
	'chosenGenre',

	function($scope, $state, movieApi, chosenGenre) {
		$scope.menu_hover = false;
		// $scope.loaded = false;	

		movieApi.getGenres().then(function(results) {
			console.log(results);
			var genres = results.data.genres;

			// Create grid array
			var genre_rows = [];

			// Divide by 4
			var splicer = function(to_splice) {
				genre_rows.push(genres.splice(0, 4));
				if(genres.length > 0) splicer();
			};

			splicer();

			$scope.genre_rows = genre_rows;
			// $scope.loaded = true;
		});

		$scope.chosenGenre = function(genre) {
			chosenGenre.genre = genre;
			$state.go('random');
		};
	}]);

controllers.controller('BrowseGenre', [
	'$scope', 
	'$state', 
	'movieApi', 
	'chosenGenre', 

	function($scope, $state, movieApi, chosenGenre) {
		$scope.genre_name = chosenGenre.genre.name;
		$scope.movie_promise = movieApi.getDiscoverByGenre(chosenGenre.genre.id);
	}]);


