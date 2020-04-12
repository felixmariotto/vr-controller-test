
function loop() {

	var delta = clock.getDelta();

	balls.forEach((ballMesh)=> {

		ballMesh.position.addScaledVector(
			ballMesh.userData.velocity,
			ballSpeed
		);

	});

	renderer.render( scene, camera );

};