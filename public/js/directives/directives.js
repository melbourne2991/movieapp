var directives = angular.module('app.directives', ['app.services']);

directives.directive('funkySlide', ['$state', '$timeout', function($state, $timeout) {
	return {
		templateUrl: 'js/directives/templates/funky_slide.html',
		scope: {
			funkySlide: '='
		},
		controller: function($scope, $element, $attrs) {
			$scope.funkySlide.then(function(results) {
				$scope.slides = results;
				
				$timeout(function() {
					console.log(results);

					var number_of_items_in_view 	= 4;
					var total_item_count 			= $scope.slides.length;
					var item_width 					= $element.find('.funky-slide').width() / number_of_items_in_view;
					var slide_container_width 		= total_item_count * item_width;
					var slide_container 			= angular.element($element.find('.slider-container'));
					var items 						= angular.element($element.find('.slide'));
					var left_arrow 					= angular.element($element.find('.nav-arrow.left'));
					var right_arrow 				= angular.element($element.find('.nav-arrow.right'));


					console.log('---vars----');
					console.log($element);
					console.log(items);

					slide_container.width(slide_container_width);

					_.forEach(items, function(item, i) {
						angular.element(item).css({
							width: item_width + 'px'
						});
					});

					left_arrow.on('click', function() {

					});

					right_arrow.on('click', function() {
						slide_container.animate({
							marginLeft: -(item_width*5)
						});
					});
				});
			});
		},
		link: function(scope, element, attrs) {

		}
	}
}]);