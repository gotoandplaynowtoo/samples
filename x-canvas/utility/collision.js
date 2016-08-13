"use strict";
var collision = (function(init) {
	return init(V2D);
})(function(V2D) {

/**
 * ============================================
 */
 	function inRange(value, min, max) {
 		return value >= Math.min(min, max) && value <= Math.max(min, max);
 	}

 	function rangeIntersect(min0, max0, min1, max1) {
 		return Math.max(min0, max0) >= Math.min(min1, max1) 
 			&& Math.min(min0, max0) <= Math.max(min1, max1);
 	}

/**
 * ============================================
 */ 


	function circleToCircle(c0, c1) {
		return V2D.dist(c0.position, c1.position) <= c0.radius + c1.radius;
	}

	function circleToPoint(c, p) {
		return V2D.dist(c.position, p) < c.radius;
	}

	function rectToPoint(r, p) {
		return inRange(p.x, r.position.x - r.width/2, (r.position.x - r.width/2) + r.width) 
			&& inRange(p.y, r.position.y - r.height/2, (r.position.y - r.height/2) + r.height);
	}

	function rectToRect(r1, r2) {	
		return rangeIntersect(r1.position.x - r1.width / 2, (r1.position.x - r1.width/2) + r1.width, r2.position.x - r2.width/2, (r2.position.x - r2.width/2) + r2.width) 
			&& rangeIntersect(r1.position.y - r1.height/2, (r1.position.y - r1.height / 2) + r1.height, r2.position.y - r2.height / 2, (r2.position.y - r2.height / 2) + r2.height);
	}

	return {
		circleToCircle: circleToCircle,
		circleToPoint: circleToPoint,
		rectToPoint: rectToPoint,
		rectToRect: rectToRect
	};
});