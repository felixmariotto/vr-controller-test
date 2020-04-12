
function loop() {

	var delta = clock.getDelta();

	balls.forEach((ballMesh)=> {

		ballMesh.position.add( ballMesh.userData.velocity );

	});

	renderer.render( scene, camera );

};