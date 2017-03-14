/**
* @function timecode
* @desc Use buzz toTimer to convert seconds into 00:00 time format
* @param {String} seconds
* @return {String} seconds
*/

(function() {
	function timecode() {
    	return function(seconds) {

			output = buzz.toTimer(seconds);
			
        	return output;
        };
    }
 
    angular
    	.module('blocJams')
        .filter('timecode', timecode);
})();
