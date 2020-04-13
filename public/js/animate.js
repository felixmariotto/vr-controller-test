



function Animate() {

	const TIME_STEP = 1 / 120 ;
	const MAX_SUBSTEP = 3 ;

	function update( delta ) {

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

		});

		cannonWorld.step( TIME_STEP, delta, MAX_SUBSTEP );

		// console.log( assetManager.controllerRight.body.position )
		[ assetManager.controllerRight, assetManager.controllerLeft ].forEach((controller)=>{

			controller.helper.position.copy( controller.body.position );
			controller.helper.quaternion.copy( controller.body.quaternion );

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