var directives = angular.module('app.directives', ['app.services']);

directives.directive('scrollToTop', [function() {
	return {
		template: '<div class="scroll-to-top-button" data-ng-class="{visible: visible }" data-ng-click="scrollToTop()"><span></span></div>',
		transclude: true,
		scope: {
			// visible: '='
		},
		controller: function($scope) { 
			$(window).on('scroll', function() {
				if($(document).scrollTop() > 500) {
					$scope.visible = true;
				} else {
					$scope.visible = false;
				}

			});

			$scope.scrollToTop = function() {
				$('html, body').animate({scrollTop: 0});
				$scope.visible = false;
			}
		},
		link: function(scope) {

		},
		compile: function(element, attrs) {
			if(!attrs.visible) attrs.visible = false;
		}
	}
}]);

directives.directive('starRating', [function() {
	return {
		templateUrl: 'js/directives/templates/star_rating.html',
		scope: {
			starRating: '='
		},
		controller: function($scope) {
			var star_rating = $scope.starRating;

			if(typeof star_rating === 'string') {
				$scope.starRating = (parseInt(star_rating) / 10)*100;
				console.log($scope.starRating)
			}
		}
	}
}]);

directives.directive('cssLoader', [function() {
	return {
		templateUrl: 'js/directives/templates/css_loader.html',
		controller: function() {

		},
		link: function() {

		}
	}
}]);

directives.directive('slideWithDetails', ['$state', '$timeout', 'imdbApi', 'movieApi', function($state, $timeout, imdbApi) {
	return {
		controller: function($scope, $element, $attrs) {
			this.selectSlide = function(selected_slide) {
				$scope.loaded = false;

				$scope.selectedSlide = selected_slide;

				var slide_details_element = $($element.find('.slide_details'));
					slide_details_element.css({minHeight: $(window).height() + 'px'})
				
				$('html, body').animate({scrollTop: slide_details_element.offset().top});

				$scope.scrollTopSwitch = true;
				console.log($scope);

				imdbApi.findByTitle(selected_slide.details.original_title).then(function(results) {
					$scope.fullDetails = results.data;
					$scope.loaded = true;
				});
			};
		},
		link: function(scope, element, attrs, scrollToTopCtrl) {
			console.log(scrollToTopCtrl);
		}
	}
}]);

directives.directive('funkySlide', ['$state', '$timeout', 'movieApi', function($state, $timeout, movieApi) {
	return {
		require: '^slideWithDetails',
		templateUrl: 'js/directives/templates/funky_slide.html',
		scope: {
			funkySlide: '@',
			numberOfItemsInView: '@',
			slideIncrement: '@',
		},
		controller: function($scope, $element, $attrs) {
			$scope.loading = true;

			console.log($scope.funkySlide);

			var results = [];	
			var genreId = $scope.funkySlide;
			var page = 1;
			var current_pos = 0;
			var number_of_items_in_view 	= $scope.numberOfItemsInView || 4;
			var item_width 					= $element.find('.funky-slide').width() / number_of_items_in_view;
			var slide_container 			= angular.element($element.find('.slider-container'));
			var slide_increment				= $scope.slideIncrement || number_of_items_in_view;

			var total_item_count;
			var item_width;
			var slide_container;
			var items;

			var getMovies = function() {
				$scope.loading = true;

				return movieApi.getDiscoverByGenre(genreId, page).then(function(results) {
					_.forEach(results, function(movie) {
						var img = $('<img src="' + movie.image + '">');	
						var new_slide = $('<div class="slide"></div>');

						new_slide.append(img);

						new_slide.css({
							width: item_width + 'px'
						});

						img.on('error', function() {
							new_slide.html('<div class="bad_image">Image Not Available</div>')
						})

						new_slide.on('click', function() {
							$scope.selectSlide(movie);
						});

						new_slide.appendTo(slide_container);
						total_item_count = slide_container.find('.slide').length;


						img.src = movie.image;
					});

					$scope.loading = false;
				});
			};

			$scope.moveLeft = function() {
				if($scope.loading) return false;

				if(current_pos !== 0) current_pos--;

				slide_container.css({
					marginLeft: -(item_width*slide_increment)*current_pos
				});
			};

			$scope.moveRight = function() {
				if($scope.loading) return false;

				if(current_pos !== total_item_count/number_of_items_in_view) current_pos++;
				if(current_pos === total_item_count/number_of_items_in_view) {
					page++
					getMovies();
				}

				slide_container.css({
					marginLeft: -(item_width*slide_increment)*current_pos
				});
			};

			getMovies();
		},
		link: function(scope, element, attrs, slideWithDetailsCtrl) {
			scope.selectSlide = function(slide) {
				slideWithDetailsCtrl.selectSlide(slide);
			}
		}
	}
}]);

directives.directive('slideDetails', ['$state', '$timeout', '$interval', function($state, $timeout, $interval) {
	return {
		require: '^slideWithDetails',
		templateUrl: 'js/directives/templates/slide_details.html',
		scope: {
			slideDetails: '=',
			fullDetails: '=',
			loaded: '='
		},
		controller: function($scope, $element, $attrs) {

		},
		link: function(scope, element, attrs, slideWithDetailsCtrl) {

		}
	}
}]);

directives.directive('backdrop', [function() {
	return {
		scope: {
			position: '@',
			background: '@',
			speed: '@'
		},
		controller: function($scope, $element, $attrs) {

		},
		link: function(scope, element, attrs) {
			var position   = scope.position || 'absolute';
			var background = scope.background || 'rgba(0, 0, 0, 0.3)';
			var speed 	   = scope.speed || '0.3';

			element.parent().css({
				position: 'relative',
			});

			element.css({
				position: position,
				width: '100%',
				height: '100%',
				background: background,
				top: 0,
				left: 0,
				transition: 'opacity ' + speed
			});
		}
	}
}]);