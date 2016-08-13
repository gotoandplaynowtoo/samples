/**
 * V2D v0.2
 */

class Vector2 {

	constructor(x = 0, y = 0) {
		this._x = x;
		this._y = y;
	}//END OF CONSTRUCTOR

	/**
	 * ===================
	 * SETTERS
	 * ===================
	 */
	set x(x) {
		this._x = x;
	}

	set y(y) {
		this._y = y;
	}

	/**
	 * ===================
	 * GETTERS
	 * ===================
	 */
	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	get magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	get sqrMagnitude() {
		return this.x * this.x + this.y * this.y;
	}

	get angle()  {
		return Math.atan2(this.y, this.x);
	}
	
	get angleDeg() {
		return Math.atan2(this.y, this.x) * 180 / Math.PI;
	}

	get normalization() {
		return new Vector2(this.x / this.magnitude, this.y / this.magnitude);
	}	

	/**
	 * ===================
	 * STATICS
	 * ===================
	 */	
	static get up() {
		return new Vector2(0, -1);
	}

	static get down() {
		return new Vector2(0, 1);
	}

	static get left() {
		return new Vector2(-1, 0);
	}

	static get right() {
		return new Vector2(1, 0);
	}

	static get zero() {
		return new Vector2(0, 0);
	}

	static get one() {
		return new Vector2(1, 1);
	}

	static distance(a, b) {

	 	var dx = a.x - b.x,
	 		dy = a.y - b.y;

	 	return Math.sqrt(dx * dx + dy * dy);		
	}

	static dot(a, b) {
		return a.x * b.x + b.x * b.y;
	}

	static angleFrom(a, b) {
		return Math.acos(Vector2.dot(a.normalization, b.normalization));
	}

	/**
	 * ===================
	 * OTHERS
	 * ===================
	 */	
	normalize() {
		var magnitude = this.magnitude;
		this.x /= magnitude;
		this.y /= magnitude;
	}

	add(other) {
		this.x += other.x;
		this.y += other.y;
	}

	sub(other) {
		this.x -= other.x;
		this.y -= other.y;
	}

	mul(d) {
		this.x *= d;
		this.y *= d;
	}

	div(d) {
		this.x /= d;
		this.y /= d;
	}

	negate() {
		this.x = -this.x;
		this.y = -this.y;
	}

	equalTo(other) {
		return this.x === other.x && this.y === other.y;
	}

	notEqualTo(other) {
		return this.x !== other.x && this.y !== other.y;
	}
	 
}//END OF CLASS 
