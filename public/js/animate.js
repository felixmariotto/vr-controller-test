



function Animate() {

	const TIME_STEP = 1 / 120 ;
	const MAX_SUBSTEP = 3 ;

	function update( delta ) {

		[ assetManager.controllerRight, assetManager.controllerLeft ].forEach((controller)=>{

			controller.body.velocity.x = controller.mesh.position.x - controller.body.position.x;
			controller.body.velocity.z = controller.mesh.position.z - controller.body.position.z;

		});

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