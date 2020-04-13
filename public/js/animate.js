



function Animate() {

	const TIME_STEP = 1 / 120 ;
	const MAX_SUBSTEP = 3 ;

	function update( delta ) {

		[ assetManager.controllerRight, assetManager.controllerLeft ].forEach( (controller)=>{

			controller.body.velocity.x = controller.mesh.position.x - controller.body.position.x;
			controller.body.velocity.y = controller.mesh.position.y - controller.body.position.y;
			controller.body.velocity.z = controller.mesh.position.z - controller.body.position.z;

			// console.log( controller.body.velocity )

		});

		cannonWorld.step( TIME_STEP, delta, MAX_SUBSTEP );

		// console.log( assetManager.controllerRight.body.position )
		[ assetManager.controllerRight, assetManager.controllerLeft ].forEach((controller)=>{

			controller.helper.position.copy( controller.body.position );

		});

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