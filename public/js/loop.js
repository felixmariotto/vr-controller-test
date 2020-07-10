
function loop() {

	var delta = clock.getDelta() * gameSpeed ;

	animate.update( delta );
	animationManager.update( delta );

	renderer.render( scene, camera );

	// console.log( renderer.info.render )

	camera.position.x = Math.sin( Date.now() / 5000 ) * 4.5
	camera.position.z = Math.cos( Date.now() / 5000 ) * 4.5
	camera.lookAt( 0, 1, 0 );

	if ( !assetManager ) return

	[
		assetManager.controllerRight,
		assetManager.controllerLeft
	]
	.forEach( (controller)=> {

		if ( !controller || !controller.inputSource ) return

		const gamepad = controller.inputSource.gamepad;

		if ( gamepad && gamepad.connected ) {

			const buttons = gamepad.buttons;

			for ( let button of buttons ) {

			    if ( button.pressed ) gameControl.start();

			};

	    };

	});

};