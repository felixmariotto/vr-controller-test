
function loop() {

	var delta = clock.getDelta() * gameSpeed ;

	animate.update( delta );
	animationManager.update( delta );

	renderer.render( scene, camera );

	if ( assetManager ) console.log( assetManager.controllerRight );

	const gamepads = navigator.getGamepads();

	for ( let gamepad of gamepads ) {

		if ( gamepad && gamepad.connected ) {

			const buttons = gamepad.buttons;

			for ( let button of buttons ) {

			    if ( button.pressed ) gameControl.start();

			};

	    };

	};

};