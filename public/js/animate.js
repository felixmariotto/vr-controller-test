

var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 3;

function animate( delta ) {

	cannonWorld.step(fixedTimeStep, delta, maxSubSteps);

	assetManager.balls.forEach( ( ball )=> {

		ball.mesh.position.copy( ball.body.position );

		/*

		ballMesh.position.addScaledVector(
			ballMesh.userData.velocity,
			assetManager.params.ballSpeed * ( delta * gameSpeed )
		);

		if ( ballMesh.position.length() > assetManager.GAME_SPHERE_RADIUS ) {
			gameSpeed = 0 ;
		};

		*/

	});

};