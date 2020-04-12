
function loop() {

	var delta = clock.getDelta() * gameSpeed ;

	assetManager.balls.forEach((ballMesh)=> {

		ballMesh.position.addScaledVector(
			ballMesh.userData.velocity,
			ballSpeed * ( delta * gameSpeed )
		);

		if ( ballMesh.position.length() > GAME_SPHERE_RADIUS ) {
			gameSpeed = 0 ;
		};

	});

	renderer.render( scene, camera );

};