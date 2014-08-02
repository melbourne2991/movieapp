var services = angular.module('app.services', ['ui.router']);

services.factory('movieApi', ['$http', 'apiConfig', function($http, apiConfig) {
	var api_url = apiConfig.url;
	var key 	= apiConfig.key;
	var config 	= apiConfig.base;

	return {
		getGenres: function() {
			return $http.get(api_url + '/genre/movie/list?api_key=' + key);
		},
		getDiscoverByGenre: function(genre_id) {
			// var random_page = Math.floor((Math.random() * 1000) + 1);
			var random_page = 1;
			var str = api_url + '/discover/movie?page=' + random_page +'&with_genres=' + genre_id + '&api_key=' + key;
			var image_config = config.images;
			var new_movie_arr = [];

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

				// var movie_array = results.data.results;

				// var random_int = Math.floor((Math.random() * movie_array.length) + 1);
				// var movie = movie_array[random_int];

				// // build image string
				// var image_config = config.images;

				// var image_url = 
				// 	image_config.base_url +
				// 	image_config.poster_sizes[4] + 
				// 	movie.poster_path;

				// 	return {
				// 		details: movie,
				// 		image: image_url
				// 	};
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
