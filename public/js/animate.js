



function Animate() {

	const TIME_STEP = 1 / 120 ;
	const MAX_SUBSTEP = 3 ;

	function update( delta ) {

		cannonWorld.step(TIME_STEP, delta, MAX_SUBSTEP);

		assetManager.balls.forEach( ( ball )=> {

			ball.mesh.position.copy( ball.body.position );

			/*

			if ( ballMesh.position.length() > assetManager.GAME_SPHERE_RADIUS ) {
				gameSpeed = 0 ;
			};

			*/

		});

	};

	return {
		update
	};

};