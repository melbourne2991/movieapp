directives.directive('slider', ['$state', function($state) {
	return {
		scope: {

		},
		controller: function($scope, $element, $attrs) {
			setTimeout(function() {
				var width  = $element.width();
				var slides = $element.find('.slide');

				_.forEach(slides, function(slide, i) {
					angular.element(slide).css({
						marginLeft: -width*i
					});
				});
			}, 500);

		},
		link: function(scope, element, attrs) {
			
		}
	}
}]);