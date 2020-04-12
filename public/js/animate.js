
function animate( delta ) {

	assetManager.balls.forEach((ballMesh)=> {

		ballMesh.position.addScaledVector(
			ballMesh.userData.velocity,
			assetManager.params.ballSpeed * ( delta * gameSpeed )
		);

		if ( ballMesh.position.length() > assetManager.GAME_SPHERE_RADIUS ) {
			gameSpeed = 0 ;
		};

	});

};