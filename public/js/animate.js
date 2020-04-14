



function Animate() {

	const TIME_STEP = 1 / 600 ;
	const SLOW_DOWN = 0.5 ; // 0 to 1 range

	var frameID = 0

	function update( delta ) {

		// update visual timer

		frameID ++

		if ( frameID % 10 === 0 && !gameControl.params.isGamePaused ) {
			screens.printTime( gameControl.getElapsedGameTime() );
		};

		// Put cannon controllers at the position of webXR controllers

		[ assetManager.controllerRight, assetManager.controllerLeft ].forEach( (controller)=>{

			controller.body.velocity.set(
				controller.mesh.position.x - controller.body.position.x,
				controller.mesh.position.y - controller.body.position.y,
				controller.mesh.position.z - controller.body.position.z
			);
			
			controller.body.position.set(
				controller.mesh.position.x,
				controller.mesh.position.y,
				controller.mesh.position.z
			);

			controller.body.quaternion.set(
				controller.mesh.quaternion.x,
				controller.mesh.quaternion.y,
				controller.mesh.quaternion.z,
				controller.mesh.quaternion.w
			);

			controller.helper.position.copy( controller.body.position );
			controller.helper.quaternion.copy( controller.body.quaternion );

		});

		// Physic simulation step

		ticks = Math.round( ( delta / ( 1 / 60 ) ) * 12 );

        for ( let i = 0 ; i < ticks ; i++ ) {

            cannonWorld.step(
            	( delta / ticks ) * ( gameControl.params.isSlowed ? SLOW_DOWN : 1 )
            );

        };

		// Update the rendered position of the balls

		if ( !gameControl.params.isGamePaused ) {

			assetManager.balls.forEach( ( ball )=> {

				ball.mesh.position.copy( ball.body.position );

				// check if the ball went out of the game sphere

				if ( ball.mesh.position.distanceTo( assetManager.GAME_SPHERE_CENTER ) >
					 assetManager.GAME_SPHERE_RADIUS ) {

					gameControl.endGame( ball );

				};

			});

		};

	};

	return {
		update
	};

};