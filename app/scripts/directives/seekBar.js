(function() {
/**
* @function seekBar
* @desc A factory function that updates seek bar based on song progress and user mouse click & drag
* @param {Object} $document Inject as a dependency
* @return {Object} Directive Definition Object
*/	
 	function seekBar($document) {

/**
* @function calculatePercent
* @desc Returns the % width of the mouse click event in reference to the seekBar width
* @param {Object} seekBar event
* @return {Number} offsetXPercent
*/
		var calculatePercent = function(seekBar, event) {
			var offsetX = event.pageX - seekBar.offset().left;
			var seekBarWidth = seekBar.width();
			var offsetXPercent = offsetX / seekBarWidth;
			offsetXPercent = Math.max(0, offsetXPercent);
			offsetXPercent = Math.min(1, offsetXPercent);
			return offsetXPercent;
		};		
		
		return {
			templateUrl: '/templates/directives/seek_bar.html',
			replace: true,
			restrict: 'E',
			scope: { },
			
/**
* @function directive link function
* @desc Drives the seekBar behaviour for both fill and thumb
* @param {Object} scope element attributes
*/			
			link: function(scope, element, attributes) {     
				scope.value = 0;
				scope.max = 100;

				var seekBar = $(element);

/**
* @function percentString
* @desc Returns the percentage of click point based on seekBar width
* @return {String} Percentage in string with % symbol
*/				
				var percentString = function () {
					var value = scope.value;
					var max = scope.max;
					var percent = value / max * 100;
					return percent + "%";
				};

/**
* @function fillStyle
* @desc Returns how much to fill the seekBar depends on the mouse click
* @return {String} HTML attribute width
*/				
				scope.fillStyle = function() {
					return {width: percentString()};
				};
				
/**
* @function thumbStyle
* desc Updates the position of the seek bar thumb
* @return {String} HTML attribute left
*/
				scope.thumbStyle = function() {
					return {left: percentString()};	
				};

/**
* @function onClickSeekBar
* desc Updats the mouse click point value
* @param {Object} event
*/				
				scope.onClickSeekBar = function(event) {
					var percent = calculatePercent(seekBar, event);
					scope.value = percent * scope.max;
				};

/**
* @function trackThumb
* desc Tracks the mouse click point on seekBar
*/				
				scope.trackThumb = function() {
					$document.bind('mousemove.thumb', function(event) {
						var percent = calculatePercent(seekBar, event);
						scope.$apply(function() {
							scope.value = percent * scope.max;
						});
					});

					$document.bind('mouseup.thumb', function() {
						$document.unbind('mousemove.thumb');
						$document.unbind('mouseup.thumb');
					});
				};
			}
 		};	
	}
 	angular
		.module('blocJams')
		.directive('seekBar', ['$document', seekBar]);
})();