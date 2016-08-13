/**
 * v0.1
 * gl-helper - webgl helper function
 */

;var GLH = (function() {

	"use strict";

	var glh = {};

	/**
	 * Use for GLH helper exception throw, GLHExeption constructor extending Error object.
	 * @param message error messasge.
	 */
	function GLHException(message) {
		this.name = "GLException";
		this.message = message;
	}

	GLHException.prototype = new Error();

	/** 
	 * Use for getting webgl context.
	 * @param canvasElement Canvas DOM element.
	 * @return glContext WebGL context. 
	 */
	glh.getGLContext = function(canvasElement) {

		var glContext = canvasElement.getContext("webgl") || 
						canvasElement.getContext("experimental-webgl");

		if(glContext === null) {
			throw new GLHException("WebGL not supported.");
		}

		return glContext;

	};//END OF GET GL CONTEXT

	/**
	 * Use for creating and compiling shader.
	 * @param gl WebGL context.
	 * @param source shader string source code.
	 * @param type shader type.
	 * @return shader the compiled shader.
	 */
	glh.createShader = function(gl, source, type) {

		var shader = gl.createShader(type);

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			throw new GLHException(gl.getShaderInfoLog(shader));
		}

		return shader;

	};//END OF CREATE SHADER

	/**
	 * Use for creating shader program and linking vertex shader and fragment shader.
	 * @param gl WebGL context
	 * @param vertexShader compiled vertex shader.
	 * @param framentShader compiled fragment shader.
	 * @return shaderProgram shader program.
	 */
	glh.createShaderProgram = function(gl, vertexShader, fragmentShader) {

		var shaderProgram = gl.createProgram();

		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);

		if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			throw new GLHException("Linking error.");
		}

		return shaderProgram;

	};//END OF CREATE SHADER PROGRAM

	return glh;

 })();