var X = (function() {

			var Dimension = {

				width: 	null,
				height: null,
				init: 	function(settings) {

							this.width 	= settings.width;
							this.height = settings.height;

						}
			};

/*-----------------------------------------------------------------------------------------------------------------------------------*/			

			var Stage = {

				domElement: 	null,
				context: 		null,
				stats: 			null,
				displayObjects: null,
				clearColor: 	null,
				clearEnabled: 	true,
				animationID:  	null,
				init: 			function(settings) {

									Stage.domElement 		= settings.domElement;
									Stage.context			= Stage.domElement.getContext("2d");
									Stage.domElement.width 	= Dimension.width;
									Stage.domElement.height = Dimension.height;

									Stage.stats								= settings.stats;
									Stage.stats.domElement.style.position 	= "absolute";
									Stage.stats.domElement.style.left 		= "0px";
									Stage.stats.domElement.style.top 		= "0px";
									document.body.appendChild(Stage.stats.domElement);	

									Stage.displayObjects 	= settings.displayObjects;				
									Stage.clearColor 		= settings.clearColor;

									if(Stage.clearColor) {

										Stage.clear = function() {

											Stage.context.fillStyle = Stage.clearColor;
											Stage.context.fillRect(0, 0, Dimension.width, Dimension.height);

										}

									}

									if(settings.clearEnabled == false) {
										Stage.clearEnabled = settings.clearEnabled;
									}

								},
				clear: 			function() {
									Stage.context.clearRect(0, 0, Dimension.width, Dimension.height);
								},
				render: 		function() {

									if(Stage.clearEnabled) {
										Stage.clear();
									}
										
									var len = Stage.displayObjects.length - 1;

									while(len >= 0) {

										Stage.displayObjects[len].update();
										Stage.displayObjects[len].render(Stage.context);

										len--;

									}

								},
				animate: function() {

							Stage.stats.begin();
							Stage.animationID = requestAnimationFrame(Stage.animate);
							Stage.render();
							Stage.stats.end();

						},
				stopAnimate: function() {
					cancelAnimationFrame(Stage.animationID);
				}
			};

/*-----------------------------------------------------------------------------------------------------------------------------------*/
	Converter = {
		toRadian: function(deg) {
			return deg * Math.PI / 180;
		},
		toDegree: function(rad) {
			return rad * 180 / Math.PI;
		}
	};

/*-----------------------------------------------------------------------------------------------------------------------------------*/
	return {

		Dimension: 	Dimension,
		Stage: 		Stage,
		Converter: 	Converter

	};

})();

