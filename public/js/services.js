var services = angular.module('app.services', ['ui.router']);

services.factory('imdbApi', ['$http', function($http) {
	var api_url = 'http://www.omdbapi.com';

	return {
		findByTitle: function(title) {
			return $http.get(api_url + '?t=' + encodeURIComponent(title));
		}
	}
}]);

services.factory('movieApi', ['$http', 'apiConfig', '$q', function($http, apiConfig, $q) {
	var api_url = apiConfig.url;
	var key 	= apiConfig.key;
	var config 	= apiConfig.base;

	var genres = [];

	return {
		getGenres: function() {
			return $http.get(api_url + '/genre/movie/list?api_key=' + key, {cache: true}).then(function(results) {
				genres = results.data.genres;
				return genres;
			});
		},
		getDiscoverByGenre: function(genre_id, page) {
			var str = api_url + '/discover/movie?page=' + page +'&with_genres=' + genre_id + '&api_key=' + key;
			var image_config = config.images;
			var new_movie_arr = [];

			console.log(str);

			return $http.get(str).then(function(results) {
				_.forEach(results.data.results, function(movie) {
					var image_url = 
						image_config.base_url +
						image_config.poster_sizes[4] + 
						movie.poster_path;

						new_movie_arr.push({
							details: movie,
							image: image_url
						});
				});

				return new_movie_arr;
			});
		},
		getMoviePost: function(movie_id) {
			return $http.get(api_url + '/movie/')
		},
		genreMetaData: function() {

		}
	}
}]);

services.value('chosenGenre', {genre: 'hello'});
