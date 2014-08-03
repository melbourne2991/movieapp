var directives = angular.module('app.directives', ['app.services']);

directives.directive('scrollToTop', [function() {
	return {
		template: '<div class="scroll-to-top-button" data-ng-if="visible" data-ng-click="scrollToTop()"><span></span></div>',
		transclude: true,
		scope: {
			visible: '='
		},
		controller: function($scope) { 
			this.enableScroll = function() {
				$scope.visible = true;
			}

			$scope.scrollToTop = function() {
				$('html, body').animate({scrollTop: 0});
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
		require: 'MainController',
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

directives.directive('funkySlide', ['$state', '$timeout', function($state, $timeout) {
	return {
		require: '^slideWithDetails',
		templateUrl: 'js/directives/templates/funky_slide.html',
		scope: {
			funkySlide: '=',
			numberOfItemsInView: '@',
			slideIncrement: '@'
		},
		controller: function($scope, $element, $attrs) {
			var current_pos = 0;

			$scope.funkySlide.then(function(results) {
				$scope.slides = results;

				$timeout(function() {
					console.log(results);

					var number_of_items_in_view 	= $scope.numberOfItemsInView || 4;
					var slide_increment				= $scope.slideIncrement || number_of_items_in_view;
					var total_item_count 			= $scope.slides.length;
					var item_width 					= $element.find('.funky-slide').width() / number_of_items_in_view;
					var slide_container_width 		= total_item_count * item_width;
					var slide_container 			= angular.element($element.find('.slider-container'));
					var items 						= angular.element($element.find('.slide'));
					var left_arrow 					= angular.element($element.find('.nav-arrow.left'));
					var right_arrow 				= angular.element($element.find('.nav-arrow.right'));

					slide_container.width(slide_container_width);

					_.forEach(items, function(item, i) {
						angular.element(item).css({
							width: item_width + 'px'
						});
					});

					$scope.moveLeft = function() {
						if(current_pos !== 0) current_pos--;

						slide_container.animate({
							marginLeft: -(item_width*slide_increment)*current_pos
						});
					};

					$scope.moveRight = function() {
						if(current_pos !== total_item_count/number_of_items_in_view-1) current_pos++;

						slide_container.animate({
							marginLeft: -(item_width*slide_increment)*current_pos
						});
					};
				});
			});
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
			$interval(function() {
				console.log(scope);
			}, 3000)
		}
	}
}]);