
function loop() {

	var delta = clock.getDelta() * gameSpeed ;

	animate.update( delta );
	animationManager.update( delta );

	renderer.render( scene, camera );

	[
		gameControl.controllerRight,
		gameControl.controllerLeft
	]
	.forEach( (controller)=> {

		if ( !controller ) return

		const gamepad = controller.inputSource.gamepad;

		if ( gamepad && gamepad.connected ) {

			const buttons = gamepad.buttons;

			for ( let button of buttons ) {

			    if ( button.pressed ) gameControl.start();

			};

	    };

	});

};