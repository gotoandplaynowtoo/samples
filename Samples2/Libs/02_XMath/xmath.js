;var xmath = (function() {

	var xmath = {};

	xmath.RAD_TO_DEG = Math.PI / 180;
	xmath.DEG_TO_RAD = 180 / Math.PI;

	xmath.normalize = function(value, min, max) {
		return (value - min) / (max - min);
	};

	xmath.lerp = function(norm, min, max) {
		return (max - min) * norm + min;
	};

	xmath.clamp = function(value, min, max) {
		return Math.min(Math.max(value, min), max);
	};

	xmath.map = function(value, smin, smax, dmin, dmax) {
		var norm = xmath.normalize(value, smin, smax);
		return xmath.lerp(norm, dmin, dmax);
	};

	xmath.randomRangeInt = function(min, max) {
		return Math.floor(min + Math.random() * (max - min + 1));
	};

	xmath.randomRange = function(min, max) {
		return min + Math.random() * (max - min);
	};

	xmath.dist = function(x1, y1, x2, y2) {
		var dx = x2 - x1,
			dy = y2 - y1;

		return Math.sqrt(dx * dx + dy * dy);
	};

	return xmath;

})();